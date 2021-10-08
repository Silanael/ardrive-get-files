#!/usr/bin/env node
//
// ardrive_get_files.ts
// Silanael 2021-10-08_01
//
import * as ardrive from 'ardrive-core-js';
import { arDriveCommunityOracle, arweave } from 'ardrive-core-js';


// Why does this have to be async?
async function main ()
{
    console.log ("Fetching data..");

    const txes = await ardrive.getAllMyDataFileTxs ("zPZe0p1Or5Kc0d7YhpT5kBC-JUPcDzUPJeMz2FdFiy4", "a44482fd-592e-45fa-a08a-e526c31b87f1", 0);


    console.log ("Filename,DataTXID,MetadataTXID");
        
    let user = 
    {
        login: 'foo',
        dataProtectionKey: '0',
        walletPrivateKey: '0',
        walletPublicKey: 'zPZe0p1Or5Kc0d7YhpT5kBC-JUPcDzUPJeMz2FdFiy4',
        syncFolderPath: '/tmp',
        autoSyncApproval: 0
    };
    
    await ardrive.setupDatabase ("./.tmp");
    let arduser = await ardrive.addNewUser ("foo", user);
    
    
    /*
    const len = txes.length;
    for (let c = 0; c < 1; c++)
    {
        let entity_type = txes[c].node.tags.find ( ({name}) => name == "Entity-Type").value;
        
        if (entity_type == "file")
        {
            let metadata_tx_id = txes[c].node.id;
            let file_id = txes[c].node.tags.find ( ({name}) => name == "File-Id").value;            
            let data_tx_id = "cafebabe"
            
            //let file = await ardrive.getPublicFileData (metadata_tx_id);
            //let file = await ardrive.getPublicFileEntity (txes[c], file_id);            
            let file = await ardrive.getFileMetaDataFromTx (txes[c], arduser);
            

            console.log ("File:" + file);
            //console.log (filename + "," + data_tx_id);
        }
   
    }
    */
}

main ()