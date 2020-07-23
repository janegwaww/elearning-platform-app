// usage
// App.js
// import React from 'react';
// import { ConfirmProvider } from '../components/LoginConfirm';

// const App = () => {
//   return (
//     <ConfirmProvider>
//       {/* ... */}
//     </ConfirmProvider>
//   );
// };

// export default App;

// Item.js
// import React from 'react';
// import Button from '@material-ui/core/Button';
// import { useConfirm } from '../components/LoginConfirm';

// const Item = () => {
//   const confirm = useConfirm();

//   const handleClick = () => {
//     confirm({ description: 'This action is permanent!' })
//       .then(() => { /* ... */ })
//       .catch(() => { /* ... */ });
//   };

//   return (
//     <Button onClick={handleClick}>
//       Click
//     </Button>
//   );
// };

// export default Item;

export { default as LoginConfirmProvider } from "./LoginConfirmProvider";
export { default as useLoginConfirm } from "./useLoginConfirm";
