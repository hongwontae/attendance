import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  console.log(userInfo);

  function inputHandler(
    identifier: "email" | "password",
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setUserInfo((prev) => {
      const value = e.target.value;
      return {
        ...prev,
        [identifier]: value,
      };
    });
  }

  async function sendServer(){
    const response = await fetch('http://localhost:3000/auth/login',{
      credentials : 'include',
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({email : userInfo.email, password : userInfo.password})
    })
    
    const resData = await response.json();
    console.log(resData);
  }

  return (
    <>
      <div className="w-screen">
        <div className="flex justify-center">
          <div className="border p-10 m-atuo flex flex-row gap-4 items-center">
            <label>Login</label>
            <input
              onChange={(e) => inputHandler("email", e)}
              className="border p-1 rounded"
              type="email"
            ></input>
            <input
              onChange={(e) => inputHandler("password", e)}
              className="border p-1 rounded"
              type="password"
            ></input>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button className="border p-2 rounded" onClick={sendServer}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
