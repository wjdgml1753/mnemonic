function RequestMnemonicForm({ requestMnemonic }) {
  const handleRequestClick = () => {
    requestMnemonic();
  }

  return <fieldset>
    <legend>랜덤 니모닉 코드 생성</legend>
    <button 
      className="RequestMnemonicForm"
      onClick={handleRequestClick}>니모닉 생성 요청</button>
  </fieldset>
}

export default RequestMnemonicForm