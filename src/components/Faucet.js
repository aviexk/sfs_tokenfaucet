
import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Message from './Messages'


const tokenAddress = "0x455f65089cac7963f4b0ec3535d453a45b6026cf"

const Faucet = (props) => {

  const [balance, setBalance] = useState()
  const [showBalance, setShowBalance] = useState(false)


  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setBalance(balance.toString());
      setShowBalance(true);

      console.log(await contract.name())
    }
  }

  async function faucet() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
      // console.log(await contract.decimals());
      contract.faucet(account[0], 100);
    }
  }
    return (
        <div>
          <Card style={{background: "rgba(0, 214, 255)"}}>
            <Card.Body>
              <Card.Subtitle>Join the army
                </Card.Subtitle><br></br>
                  <div className="d-grid gap-2">
                    <Button onClick={faucet}>get SFS tokens!</Button>
                    <Button onClick={getBalance} variant="warning">check ya balance</Button>   
                    { showBalance ? <Message balance={balance}/> : null }
                  </div>
              </Card.Body>
          </Card>
        </div>
    )
}

export default Faucet