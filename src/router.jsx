import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import AccountsManagement from './pages/AccountsManagement';
import CreateAccount from './pages/CreateAccount';
import AddFunds from './pages/AddFunds';
import TransferFunds from './pages/TransferFunds';
import GetBalance from './pages/GetBalance';
import NotFound from './pages/NotFound';
import Transactions from './pages/Transactions';
import CreateTransaction from './pages/CreateTransaction';
import Blockchain from './pages/Blocks';
import MemberList from './pages/MemberList';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="transactions" element={<Transactions />}>
      <Route path="create-transaction" element={<CreateTransaction />} />
      <Route path="broadcast-transaction" element={<AddFunds />} />
      </Route>
      <Route
        path="blocks"
        element={<Blockchain />}
      />

        <Route path="memberlist" element={<MemberList />} />
     
      <Route path="accounts-management" element={<AccountsManagement />}>
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="add-funds" element={<AddFunds />} />
        <Route path="transfer-funds" element={<TransferFunds />} />
        <Route path="get-balance" element={<GetBalance />} />
      </Route>
      
      <Route
        path="*"
        element={<NotFound />}
      />
    </Route>
  )
);

// import { createBrowserRouter } from 'react-router-dom';
// import AccountsManagement  from './pages/AccountsManagement';
// import  Home  from './pages/Home';
// import  Layout  from './pages/Layout';
// import NotFound  from './pages/NotFound';
// import CreateNewAccount from './pages/CreateNewAccount';

// console.log("Router Configuration Loaded");

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <NotFound />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//         loader: () => console.log('Home Page Loaded')
//       },
//       {
//         path: '/accounts-management/*',
//         element: <AccountsManagement/>,
//         children: [
//           {
//             path: 'create-account',
//             element: <CreateNewAccount />,
//             loader: () => console.log('Create Account Page Loaded'),
//           },
//         ],
//       },
//     ],
//   },
// ]);
