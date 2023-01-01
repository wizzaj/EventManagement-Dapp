//0xd67B1c8Cc9ABD059b86A4455eA7FA494AB0059BF
import eventManagementJson from "./eventManagement.json"
import { ethers } from "ethers";
export const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/8d59bc89354d49098e71aa0cc638eaa7");
export const contractAddress= '0xd67B1c8Cc9ABD059b86A4455eA7FA494AB0059BF';
export const Abi =  eventManagementJson.abi;