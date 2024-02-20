import {NavLink} from "react-router-dom";
import {Card} from "antd";

function CaisseLink() {
	return (
		<div>
			<div className="flex pl-5 mb-10">
				<NavLink
					to={"/income"}
					id="revenu">
					<Card
						className="w-80 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1
						hover:scale-110 duration-300">
						<h2
							className="mb-10 text-xl w-24 rounded-lg text-center text-white bg-supportingColor2 hover:bg-white">Revenu</h2>
						<h2 className="text-4xl text-color1 font-semibold text-supportingColor1">
							$5000ht
						</h2>
					</Card>
				</NavLink>
				
				<NavLink
					to={"/expense"}
					id="expense">
					<Card className="w-80 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1
						hover:scale-110 duration-300">
						<h2 className="mb-10 text-xl w-24 rounded-lg text-center text-white bg-supportingColor3">Dépense</h2>
						<h2 className="text-4xl text-color1 font-semibold text-supportingColor1">
							$1000ht
						</h2>
					</Card>
				</NavLink>
				
				<NavLink
					to={"/gain"}
					id="bank">
					<Card className="w-80 mt-10 mr-16 shadow-sm transition ease-in-out delay-15 hover:-translate-y-1
						hover:scale-110 duration-300">
						<h2 className="mb-10 text-xl w-36 rounded-lg text-center text-white bg-supportingColor4">Profit & Perte</h2>
						<h2 className="text-4xl text-color1 font-semibold text-supportingColor1">
							$4000ht
						</h2>
					</Card>
				</NavLink>
			</div>
		</div>
	);
}

export default CaisseLink;
