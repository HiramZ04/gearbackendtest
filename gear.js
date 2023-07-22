import { GearApi, getProgramMetadata } from '@gear-js/api';
const gearApi = await GearApi.create({
    providerAddress: 'wss://testnet.vara.rs',
  });

import {Router} from 'express';
const router = Router();

router.post("/contract-msg",async (req,res) => {
    //Inicia el codigo para tratar de hacer el send.message a traves del boton
    try {
        const payload = {
            "Mint": {
                        "transaction_id": 301,
                        "token_metadata": {
                            "name": "Boleto Rauw",
                            "description": "Boleto VIP para ir a ver a Rauw alejandro el 16 de agosto",
                            "media": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU1fg50thdcQKYYgAJ1Bp1vEDGi6SRAKgX9w&usqp=CAU",
                            "reference": ""
                        }
            }}
        const metadata = getProgramMetadata('0xe0fcab8c30ab8f54c550ecaae933f8673aacb875995d3426d986ffdf9e52b0e8')
        const message = {
          destination: 0xe0fcab8c30ab8f54c550ecaae933f8673aacb875995d3426d986ffdf9e52b0e8, // programId
          payload: payload,
          gasLimit: 10000000,
          value: 1000,
        };
        // In that case payload will be encoded using meta.types.handle.input type
        let extrinsic = gearApi.message.send(message, metadata);
        
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
      try {
        await extrinsic.signAndSend(keyring, (event) => {
          console.log(event.toHuman());
        });
      } catch (error) {
        console.error(`${error.name}: ${error.message}`);
      }
})
export default router;
