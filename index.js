#!/usr/bin/env node
//
// ardrive-get-files
//
// Silanael 2021-10-08_01
//
//    Website: www.silanael.com
//    E-mail:  sila@silanael.com
//    Arweave: zPZe0p1Or5Kc0d7YhpT5kBC-JUPcDzUPJeMz2FdFiy4
//    ArDrive: a44482fd-592e-45fa-a08a-e526c31b87f1
//


// Imports
const ardrive                  = require ('ardrive-core-js');
const arweave                  = require ('ardrive-core-js').arweave;
const arDriveCommunityOracle   = require ('ardrive-core-js').arDriveCommunityOracle;
const prompt                   = require ('prompt-sync') ();
const fs                       = require ('fs');



// Constants
const nl                  = "\n";
const mode_nametx         = 0;
const mode_default        = 1;
const mode_extensive      = 2;




async function main ()
{


    // Get drive information from the user    
    //  
    let arweave_address = prompt ("Enter Arweave-address: ")
    if (arweave_address == null || arweave_address == "")
    {
        console.error ("Aborted.");
        process.exit (-1);
    }
    arweave_address = arweave_address.replace (/[^a-zA-Z0-9\-]/g, '');


    let drive_id = prompt ("Enter Drive ID: ");
    if (drive_id == null || drive_id == "")
    {
        console.error ("Aborted.");        
        process.exit (-1);
    }
    drive_id = drive_id.replace (/[^a-zA-Z0-9\-]/g, '');


    // Generate the default output file
    const now = new Date ();
    const default_output_file = now.getFullYear () 
                                + "-" 
                                + String (now.getMonth () ).padStart (2, '0')
                                + "-" 
                                + String (now.getDate  () ).padStart (2, '0')
                                + "_" 
                                + "ArDrive-" + drive_id + "_Files.csv"


    let output_file = prompt ("Enter output file (ENTER for default: " + default_output_file + "): ");
    if (output_file == null)
    {
        console.error ("Aborted.");        
        process.exit (-1);        
    }
    else if (output_file == "") output_file = default_output_file;



    console.log ("Output modes:");
    console.log ("0) filename, data TX ID");
    console.log ("1) filename, data TX ID, ar://, arweave.net");
    console.log ("2) extensive");
    let output_mode = prompt ("Enter output mode [0/1/2] (ENTER for default: 1): ");
    
    if (output_mode == null)
    {
        console.error ("Aborted.");        
        process.exit (-1);
    }
    else if (output_mode == "") output_mode = mode_default;
    else output_mode = parseInt (output_mode, 10);
    
    






    // Get data of all the files on the drive.
    // The name of the function is misleading.
    //
    console.log ("Acquiring file data..");
    const txes = await ardrive.getAllMyDataFileTxs (arweave_address, drive_id, 0);
    
    if (txes.length <= 0)
    {
        console.error ("ERROR: Was unable to get file data for the given Arweave-address / drive.");
        process.exit (-1);
    }


    


    // This is a stupid. 
    // Had to create a database and a user just to get public file metadata.
    // Suppose I could have manually downloaded and parsed the .json, but meh.
    //
    let user = 
    {
        login: 'foo',
        dataProtectionKey: '0',
        walletPrivateKey: '0',
        walletPublicKey: '',
        syncFolderPath: '/tmp',
        autoSyncApproval: 0
    };
    
    await ardrive.setupDatabase ("./.tmp");
    let arduser = await ardrive.addNewUser ("foo", user);






    // CSV first row
    //
    let output = ""
    switch (output_mode)
    {
        case mode_nametx:
            output = "Filename,DataTxID"
            break;

        case mode_extensive:
            output = "Filename,DataTxID,ARlink,Arweave.net,Size_Bytes,UNIXTime,MIMEType,App,AppVersion,MetadataTxID"
            break;

        default:
            output = "Filename,DataTxID,ARlink,Arweave.net"
            break;
    }
    output = output + nl;


    
    const len = txes.length;
    for (let c = 0; c < len; c++)
    {
        let entity_type = txes[c].node.tags.find ( ({name}) => name == "Entity-Type").value;
        
        if (entity_type == "file")
        {            
            let file_id = txes[c].node.tags.find ( ({name}) => name == "File-Id").value;            
                                  
            // Get metadata of the file
            await ardrive.getFileMetaDataFromTx (txes[c], user);
            let metadata = await ardrive.getByMetaDataTxFromSyncTable (txes[c].node.id);
            
            let filename   = metadata.fileName;
            let data_tx_id = metadata.dataTxId;
            let meta_tx_id = metadata.metaDataTxId;
            let filesize   = metadata.fileSize;
            let unixtime   = metadata.unixTime;
            let mimetype   = metadata.contentType;
            let appname    = metadata.appName;
            let appversion = metadata.appVersion;
            let arlink     = "ar://" + data_tx_id;
            let arweavenet = "https://arweave.net/" + data_tx_id;


            // Add CSV row
            switch (output_mode)
            {
                case mode_nametx:                    
                    output = output 
                           + filename    + "," 
                           + data_tx_id  + ","
                           + nl                           
                    break;
        
                case mode_extensive:                    
                    output = output 
                           + filename    + "," 
                           + data_tx_id  + "," 
                           + arlink      + "," 
                           + arweavenet  + ","
                           + filesize    + ","
                           + unixtime    + ","
                           + mimetype    + ","
                           + appname     + ","
                           + appversion  + ","
                           + meta_tx_id  + ","
                           + nl;
                    break;
        
                default:                    
                    output = output 
                           + filename    + "," 
                           + data_tx_id  + "," 
                           + arlink      + "," 
                           + arweavenet      
                           + nl;
                    break;
            }            
            
        }
   
    }
    




    // Write the gathered data into the output file
    //
    let success = false;
    while (!success)
    {    
        console.log ("Writing to " + output_file + "...");
        try
        {
            fs.writeFileSync (output_file, output)
            success = true;
            console.log ("OK");
        }

        catch (exception)
        {
            console.log ("Failed to write to file " + output_file + ":");
            if ( prompt ("Want to change the destination filename? [y/N]").toUpperCase () == "Y" )
            {
                output_file = prompt ("Enter output file (ENTER for default: " + default_output_file + "): ")
                if (output_file == "") output_file = default_output_file;
            }
            else
                process.exit (-1);
        }
    }
}



main ()