import { useState } from "react";
import {
	Flex,
	Space,
	Table,
	Tag,
	Button,
	Popconfirm,
	Tooltip,
	Typography,
	InputNumber,
	Input,
	Card,
	Divider,
	Alert,
} from "antd";

const { Title, Text } = Typography;
import {
	EditOutlined,
	DeleteOutlined,
	PlusOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";

const products = [
	{
		id: "p01",
		name: "Keyboard",
		price: 25,
		stock: 10,
		tags: ["gear", "accessories"],
	},
	{
		id: "p02",
		name: "Mouse",
		price: 15,
		stock: 5,
		tags: ["gear", "accessories"],
	},
	{
		id: "p03",
		name: "Monitor",
		price: 120,
		stock: 2,
		tags: ["display"],
	},
	{
		id: "p04",
		name: "Headset",
		price: 45,
		stock: 8,
		tags: ["gear", "audio"],
	},
	{
		id: "p05",
		name: "Laptop Stand",
		price: 30,
		stock: 0,
		tags: ["accessories", "office"],
	},
];

function App() {
	const productColumns = [
		{ title: "ID", dataIndex: "id", key: "id" },
		{ title: "Name", dataIndex: "name", key: "name" },
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			render: (p) => `$${p}`,
		},
		{ title: "Stock", dataIndex: "stock", key: "stock" },
		{
			title: "Tags",
			dataIndex: "tags",
			key: "tags",
			render: (tags) => (
				<Flex gap="small" wrap>
					{tags.map((tag) => (
						<Tag
							color={tag.length > 5 ? "geekblue" : "green"}
							key={tag}
						>
							{tag.toUpperCase()}
						</Tag>
					))}
				</Flex>
			),
		},
		{
			title: "Action",
			key: "action",
			width: 200,
			render: (_, record) => (
				<Button
					type="primary"
					icon={<ShoppingCartOutlined />}
					onClick={() => {
						if (record.stock <= 0) {
							alert("Sản phẩm này đã hết");
							return;
						}
						handleAddToCart(record.id, 1);
					}}
				>
					Add to cart
				</Button>
			),
		},
	];

	const cartColumns = [
		{ title: "ProductId", dataIndex: "productId", key: "productId" },
		{
			title: "Quantity",
			dataIndex: "quantity",
			key: "quantity",
			render: (_, record) => {
				return (
					<InputNumber
						value={record.quantity}
						min={0}
						max={1000}
						onChange={(value) =>
							handleUpdateQuantity(record.productId, value)
						}
					/>
				);
			},
		},
		{
			title: "Action",
			key: "action",
			width: 200,
			render: (_, record) => (
				<Space size="middle">
					<Popconfirm
						title="Bạn có chắc chắn muốn xóa?"
						onConfirm={() => handleRemoveFromCart(record.productId)}
						okText="Có"
						cancelText="Không"
					>
						<Button
							type="primary"
							danger
							icon={<DeleteOutlined />}
						/>
					</Popconfirm>
				</Space>
			),
		},
	];

	// Khởi tạo state với giá trị mặc định
	const [cart, setCart] = useState([{ productId: "p01", quantity: 2 }]);
	const [couponInput, setCouponInput] = useState("");
	const [cartSummary, setCartSummary] = useState(null);
	const [isOutOfStock, setIsOutOfStock] = useState(false);

	const existsInProducts = (productId) => {
		return products.some((product) => product.id === productId);
	};
	const existsInCart = (productId) => {
		return cart.some((item) => item.productId === productId);
	};

	const handleAddToCart = (productId, quantity) => {
		if (!existsInProducts(productId)) {
			alert("Sản phẩm này không tồn tại");
			return;
		}
		if (!existsInCart(productId)) {
			setCart([...cart, { productId, quantity }]);
		} else {
			const newCart = cart.map((item) =>
				item.productId === productId
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setCart(newCart);
		}
	};

	const handleUpdateQuantity = (productId, quantity) => {
		if (!existsInProducts(productId)) {
			alert("Sản phẩm này không tồn tại");
			return;
		}
		if (!existsInCart(productId)) {
			alert("Sản phẩm này không tồn tại trong giỏ hàng");
			return;
		} else {
			const newCart = cart
				.map((item) =>
					item.productId === productId
						? { ...item, quantity: quantity }
						: item
				)
				.filter((item) => item.quantity != 0);
			setCart(newCart);
		}
	};

	const handleRemoveFromCart = (productId) => {
		if (!existsInProducts(productId)) {
			alert("Sản phẩm này không tồn tại");
			return;
		}
		if (!existsInCart(productId)) {
			alert("Sản phẩm này không tồn tại trong giỏ hàng");
			return;
		} else {
			const newCart = cart.filter((item) => item.productId !== productId);
			setCart(newCart);
		}
	};

	const handleCalcCartSummary = () => {
		const items = cart.map((item) => {
			const existedProduct = products.find(
				(product) => product.id === item.productId
			);
			return {
				...item,
				name: existedProduct.name,
				price: existedProduct.price,
				lineTotal: (existedProduct?.price || 0) * item.quantity,
			};
		});

		const subTotal = items.reduce(
			(total, item) => total + item.lineTotal,
			0
		);

		let discount = 0;
		if (couponInput.toUpperCase() === "SAVE10") discount = subTotal * 10;
		if (couponInput.toUpperCase() === "SHIPFREE") discount += 5;

		if (discount > subTotal) {
			discount = subTotal;
		}

		const total = subTotal - discount;

		const outOfStockItems = items
			.map((item) => ({
				productId: item.productId,
				name: item.name,
				requestedQty: item.quantity,
				stock: products.find((p) => p.id === item.productId)?.stock,
			}))
			.filter((item) => item.requestedQty > item.stock);

		if (outOfStockItems.length > 0) {
			setIsOutOfStock(true);
		} else {
			setIsOutOfStock(false);
		}
		setCartSummary({
			items,
			subTotal,
			discount,
			total,
			outOfStockItems,
		});
	};

	return (
		<div className="">
			<section>
				<Typography>
					<Title level={2}> Danh mục sản phẩm</Title>
				</Typography>
				<Table
					columns={productColumns}
					dataSource={products}
					rowKey="id"
				/>
			</section>
			;
			<section>
				<Typography>
					<Title level={2}> Giỏ hàng của bạn</Title>
				</Typography>
				<Table
					columns={cartColumns}
					dataSource={cart}
					rowKey="productId"
				/>

				<div style={{ marginTop: 24 }}>
					<Space
						orientation="vertical"
						style={{ width: "100%" }}
						size="large"
					>
						<Space>
							<Input
								placeholder="Nhập mã (SAVE10, SHIPFREE)"
								value={couponInput}
								onChange={(e) =>
									setCouponInput(e.target.value.toUpperCase())
								}
							/>
							<Button
								type="primary"
								onClick={handleCalcCartSummary}
							>
								Tính tiền
							</Button>
						</Space>

						{cartSummary && !isOutOfStock && (
							<Card title="Chi tiết hóa đơn" size="small">
								<p>
									Tạm tính (SubTotal):{" "}
									<b>${cartSummary.subTotal}</b>
								</p>
								<p>
									Giảm giá (Discount):{" "}
									<span style={{ color: "red" }}>
										-${cartSummary.discount}
									</span>
								</p>
								<Divider />
								<Title level={4}>
									Tổng cộng: ${cartSummary.total}
								</Title>
							</Card>
						)}
						{cartSummary &&
							cartSummary.outOfStockItems.length > 0 && (
								<Alert
									title="Cảnh báo kho hàng"
									description={
										<ul>
											{cartSummary.outOfStockItems.map(
												(item) => (
													<li key={item.productId}>
														{item.name}: Bạn đặt{" "}
														{item.requestedQty}{" "}
														nhưng chỉ còn{" "}
														{item.stock} trong kho.
													</li>
												)
											)}
										</ul>
									}
									type="warning"
									showIcon
								/>
							)}
					</Space>
				</div>
			</section>
		</div>
	);
}

export default App;
