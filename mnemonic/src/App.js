import lightwallet from 'eth-lightwallet/dist/lightwallet'
import './App.css';
import RequestMnemonicForm from './component/RequestMnemonicForm'
import RequestAccountForm from './component/RequestAccountForm'
import Mnemonic from './component/Mnemonic'
import Account from './component/Account'
import { useState } from 'react'

/**
 *  RequestMnemonicForm : 니모닉 요청 콤포넌트
 *  RequestAccountFrom  : 지갑주소 요청 콤포넌트 
 *  Mnemonic : 니모닉 결과 콤포넌트
 *  Account : 지갑주소 결과 콤포넌트
 */
export default function App(){ //니모닉 및 지갑주소 결과값 저장
  const [mnemonicResult, setMnemonicResult] = useState();
  const [accountResult, setAccountResult] = useState();

  const requestMnemonic = () => {   
  	// 니모닉 요청
    const mnemonic = lightwallet.keystore.generateRandomSeed();
    setMnemonicResult(mnemonic);
  }

  // 지갑주소 요청
  const requestAccount = (mne, pwd) => {    // 지갑주소 요청
    lightwallet.keystore.createVault({
      password: pwd, 
      seedPhrase: mne,
      hdPathString: "m/0'/0'/0'"
    }, function (err, ks) {
      ks.keyFromPassword(pwd, function (err, pwDerivedKey) {
        ks.generateNewAddress(pwDerivedKey, 1);
        
        let address = (ks.getAddresses()).toString();
        let keystore = ks.serialize();

        setAccountResult({ keystore, address });
      });
    });
  }

  return (
    <>
      <div className="homepage__container">
        <h1>지원자 김정희 니모닉 지갑👛</h1>
      
      <div id="mnemonic-container">
      <RequestMnemonicForm requestMnemonic={ requestMnemonic }/>
      <Mnemonic result={mnemonicResult} />
      </div>
     
      <div>
          <RequestAccountForm requestAccount={ requestAccount }/>
          <Account result={accountResult} />
      </div>

      </div>
    </>
  )
}

