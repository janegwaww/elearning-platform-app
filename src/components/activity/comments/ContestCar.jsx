import React from "react";

const ContestCar = (props) => {
  return (
    <div style={{ marginTop: "2.5rem" }}>
      <div
        style={{
          width: "12.5rem",
          height: "12.5rem",
          borderRadius: "50%",
          margin: "0 auto",
          backgroundColor:'#eee',
          backgroundImage: `url(${props.info.headshot})`,
        }}
        className="bg-not "
      ></div>
      <div
        style={{
          fontSize: "1.25rem",
          fontFamily: "MicrosoftYaHei",
          color: "#2C2C3B",

          lineHeight: 1.25,
        }}
        className="text-center"
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            padding: "20px 0 12px 0",
          }}
        >
          {props.info.name}
        </div>
        <div>
          {props.info.label.map((v, inx) => (
            <p key={inx}>{v}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContestCar;
