import { Card } from "react-bootstrap";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const CategoryChart = ({ data }) => (
	<Card className="border-0 shadow-sm p-4 h-100">
		<Card.Title className="fw-bold mb-4">News by Category</Card.Title>
		<div style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="name" fontSize={12} />
					<YAxis fontSize={12} />
					<Tooltip cursor={{ fill: "#f8f9fa" }} />
					<Bar
						dataKey="count"
						fill="#f27123"
						radius={[4, 4, 0, 0]}
						barSize={40}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	</Card>
);

export default CategoryChart;
