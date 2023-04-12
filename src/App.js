import Product from './Product/Product';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Address from './Product/Address/Address2';
import Payment from './Payment/Payment';
import Summary from './Summary/Summary';
import Add from './AddToList/Add';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/product" element={<Product />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Signup />} />
				<Route path="/address" element={<Address />} />
				<Route path="/payment" element={<Payment />} />
				<Route path="/summary" element={<Summary />} />
				<Route path="/add" element={<Add />} />
				{/* <Route path="/product/2" element={<Description/>}/> */}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
