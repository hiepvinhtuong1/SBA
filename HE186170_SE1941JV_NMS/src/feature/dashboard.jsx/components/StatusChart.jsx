import { Card } from "react-bootstrap";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const StatusChart = ({ data }) => (
	<Card className="border-0 shadow-sm p-4 h-100">
		<Card.Title className="fw-bold mb-4">Publication Status</Card.Title>
		<div style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						innerRadius={60}
						outerRadius={80}
						paddingAngle={5}
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip />
					<Legend verticalAlign="bottom" />
				</PieChart>
			</ResponsiveContainer>
		</div>
	</Card>
);

export default StatusChart;
