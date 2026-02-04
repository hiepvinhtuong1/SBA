import { Card, Col } from "react-bootstrap";

const StatsCard = ({ title, count, icon, color }) => (
	<Col md={3}>
		<Card className="border-0 shadow-sm p-3 h-100">
			<div className="d-flex align-items-center justify-content-between">
				<div>
					<div className="text-muted small fw-bold text-uppercase">
						{title}
					</div>
					<h3 className="fw-bold mb-0 mt-1">{count}</h3>
				</div>
				<div
					className={`fs-2 p-2 bg-light rounded-circle text-${color}`}
				>
					{icon}
				</div>
			</div>
		</Card>
	</Col>
);

export default StatsCard;
