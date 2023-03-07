import { useState } from "react";
import "./App.css";

import { Configuration, OpenAIApi } from "openai";

function App() {
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const [pic, setpic] = useState("");
  const [num, setnum] = useState("");
  const [size, setsize] = useState("");
  const [result, setresult] = useState([]);
  const [btn, setbtn] = useState("Generate! 😎");

  const findpic = async (pic, num, size) => {
    console.log(pic, num, size);
    if (pic === "" || num === "" || size === "" || num === "0")
      return alert("Please Fill All Fields Correctly! 😀");

    try {
      setbtn("Generating 😁");
      const aiResponse = await openai.createImage({
        prompt: pic,
        n: Number(num),
        size,
        response_format: "b64_json",
      });

      // const image = aiResponse.data.data;
      console.log(aiResponse);
      setresult(aiResponse.data.data);
      setbtn("Generate 😎");
    } catch (error) {
      setbtn("Generate 😎");
      console.log(error);
    }
  };

  return (
    <div className="App row m-1 p-0">
      <h3>AI Image Generation Tool</h3>
      <textarea
        type="text"
        value={pic}
        onChange={(e) => setpic(e.target.value)}
        placeholder="Photo description"
        cols="30"
        rows="3"
        className="form-group col-md-5 m-1"
      />
      <br />
      <input
        type="number"
        className="form-group col-md-2 m-1"
        value={num}
        onChange={(e) => {
          setnum(e.target.value);
        }}
        placeholder="Number of Photos"
      />
      <select
        value={size}
        onChange={(e) => {
          setsize(e.target.value);
        }}
        className="form-group col-md-2 m-1"
      >
        <option value="">Select Size</option>
        <option value="1024x1024">1024x1024</option>
        <option value="512x512">512X512</option>
        <option value="256x256">256X256</option>
      </select>

      <button className="col-md-2" onClick={() => findpic(pic, num, size)}>
        {btn}
      </button>
      <br />
      {result.map((pic, i) => (
        <img
          className="col-md-5 m-1 p-0"
          key={i}
          src={`data:image/jpeg;base64,${pic.b64_json}`}
          alt="pic"
        />
      ))}
    </div>
  );
}

export default App;
