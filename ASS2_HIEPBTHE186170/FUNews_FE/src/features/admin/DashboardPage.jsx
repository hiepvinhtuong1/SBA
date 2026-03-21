import React from 'react';
import { 
  TrendingUp, 
  FileText, 
  Layers, 
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon: Icon }) => (
  <div className="tonal-card">
    <div className="d-flex justify-content-between align-items-start mb-3">
      <div className="bg-primary-container p-2 rounded-lg text-primary">
        <Icon size={24} />
      </div>
      <div className={`d-flex align-items-center ${isPositive ? 'text-success' : 'text-danger'}`} style={{ fontSize: '0.75rem', fontWeight: '600' }}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="ml-1">{change}%</span>
      </div>
    </div>
    <h3 className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>{title}</h3>
    <p className="h3 font-weight-bold mb-0">{value}</p>
  </div>
);

const DashboardPage = () => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="editorial-display" style={{ fontSize: '2rem' }}>Dashboard Overview</h1>
        <p className="text-muted">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <StatCard title="Total News" value="1,284" change="12.5" isPositive={true} icon={FileText} />
        </div>
        <div className="col-md-3 mb-3">
          <StatCard title="Active News" value="842" change="8.2" isPositive={true} icon={TrendingUp} />
        </div>
        <div className="col-md-3 mb-3">
          <StatCard title="Categories" value="24" change="0" isPositive={true} icon={Layers} />
        </div>
        <div className="col-md-3 mb-3">
          <StatCard title="Total Users" value="156" change="2.4" isPositive={false} icon={Users} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="tonal-card h-100">
            <h3 className="mb-4">News Performance</h3>
            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <p className="text-muted">Chart Placeholder (News Over Time)</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="tonal-card h-100">
            <h3 className="mb-4">Category Distribution</h3>
            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <p className="text-muted">Chart Placeholder (Pie Chart)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
