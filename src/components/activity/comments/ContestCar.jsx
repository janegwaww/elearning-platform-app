import React from "react";

const ContestCar = (props) => {
  return (
    <div style={{ marginTop: "0.4em" }} className='contestcar'>
      <div
        style={{
          width: "2em",
          height: "2em",
          borderRadius: "50%",
          margin: "0 auto",
          backgroundColor:'#eee',
          backgroundImage: `url(${props.info.headshot})`,
        }}
        className="bg-not "
      ></div>
      <div
        style={{
          
          fontFamily: "MicrosoftYaHei",
          color: "#2C2C3B",

          lineHeight: 1.25,
        }}
        className="text-center"
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "0.24em",
            padding: "0.84em 0 0.5em 0",
          }}
        >
          {props.info.name}
        </div>
        <div style={{fontSize:'0.2em'}}>
          {props.info.label.map((v, inx) => (
            <p key={inx}>{v}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContestCar;
