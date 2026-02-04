import React, { useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { Newspaper, ListUl, Tags, People } from "react-bootstrap-icons";
import StatsCard from "../components/StatsCard";
import CategoryChart from "../components/CategoryChart";
import StatusChart from "../components/StatusChart";
import RecentNewsTable from "../components/RecentNewsTable";

// Import các con

const Dashboard = () => {
	const { news, categories, tags, accounts } = useLoaderData();

	// Logic xử lý dữ liệu biểu đồ
	const categoryData = useMemo(() => {
		return categories
			.map((cat) => ({
				name: cat.CategoryName,
				count: news.filter((n) => n.CategoryID === cat.id).length,
			}))
			.filter((item) => item.count > 0);
	}, [news, categories]);

	const statusData = useMemo(
		() => [
			{
				name: "Published",
				value: news.filter((n) => n.NewsStatus === 1).length,
				color: "#198754",
			},
			{
				name: "Draft",
				value: news.filter((n) => n.NewsStatus === 0).length,
				color: "#6c757d",
			},
		],
		[news],
	);

	const recentNews = useMemo(() => {
		return [...news]
			.sort((a, b) => new Date(b.ModifiedDate) - new Date(a.ModifiedDate))
			.slice(0, 5);
	}, [news]);

	return (
		<div className="p-4">
			<h2 className="fw-bold mb-4 text-dark">System Dashboard</h2>

			<Row className="g-4 mb-4">
				<StatsCard
					title="Total News"
					count={news.length}
					icon={<Newspaper />}
					color="warning"
				/>
				<StatsCard
					title="Categories"
					count={categories.length}
					icon={<ListUl />}
					color="primary"
				/>
				<StatsCard
					title="Tags"
					count={tags.length}
					icon={<Tags />}
					color="info"
				/>
				<StatsCard
					title="Users"
					count={accounts.length}
					icon={<People />}
					color="success"
				/>
			</Row>

			<Row className="g-4">
				<Col lg={8}>
					<CategoryChart data={categoryData} />
				</Col>
				<Col lg={4}>
					<StatusChart data={statusData} />
				</Col>
				<Col md={12}>
					<RecentNewsTable news={recentNews} />
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
