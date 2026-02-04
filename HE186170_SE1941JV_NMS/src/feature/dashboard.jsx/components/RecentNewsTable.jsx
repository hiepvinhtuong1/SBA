import { Card, Table, Badge } from "react-bootstrap";

const RecentNewsTable = ({ news }) => (
	<Card className="border-0 shadow-sm mt-4">
		<Card.Header className="bg-white py-3 border-0">
			<h5 className="fw-bold mb-0">Recently Modified News</h5>
		</Card.Header>
		<Table responsive hover className="mb-0">
			<thead className="bg-light">
				<tr>
					<th>Title</th>
					<th>Modified Date</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{news.map((item) => (
					<tr key={item.id}>
						<td className="fw-semibold">{item.NewsTitle}</td>
						<td className="text-muted small">
							{item.ModifiedDate}
						</td>
						<td>
							<Badge
								bg={
									item.NewsStatus === 1
										? "success"
										: "secondary"
								}
							>
								{item.NewsStatus === 1 ? "Published" : "Draft"}
							</Badge>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	</Card>
);

export default RecentNewsTable;
