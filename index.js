import 'dotenv/config'
import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
)

const txHash = process.argv[3]

if (!txHash) {
  console.log('Please provide transaction hash')
  process.exit(1)
}

async function main() {
try{
  const tx = await provider.getTransaction(txHash)

  console.log('Transaction Hash:', tx.hash)
  console.log('From:', tx.from)
  console.log('To:', tx.to)

  const ethValue = ethers.formatEther(tx.value)

  console.log('Value:', ethValue, 'ETH')
  console.log('Gas Limit:', tx.gasLimit.toString())
  console.log('Block Number:', tx.blockNumber)

  const receipt = await provider.getTransactionReceipt(txHash)

  console.log('Status:', receipt.status === 1 ? 'Success' : 'Failed')
  console.log('Gas Used:', receipt.gasUsed.toString())
}catch(error){
  console.error('Error fetching transaction details:', error)
}
}

main()