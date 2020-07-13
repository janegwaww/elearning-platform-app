import React from "react";



class Dynamic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}

  render() {
    console.log(this.props);
    const { children } = this.props;
    return (
      <section className="bg-white profile-padding all-height view-scroll ">
        
        <main>{children}</main>
      </section>
    );
  }
}
export default Dynamic;
