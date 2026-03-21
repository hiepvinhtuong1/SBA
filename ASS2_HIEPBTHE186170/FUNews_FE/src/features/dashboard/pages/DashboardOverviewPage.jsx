import { Newspaper, CheckCircle, Layers, Users, MoreVertical } from 'lucide-react';

export const DashboardOverview = () => {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Hero Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 transition-colors hover:bg-surface-container-high group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-primary-container text-on-primary-container rounded-lg">
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">+12%</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-on-surface tracking-tighter">1,248</div>
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Total News</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 transition-colors hover:bg-surface-container-high group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-secondary-container text-on-secondary-container rounded-lg">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">+5%</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-on-surface tracking-tighter">842</div>
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Active News</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 transition-colors hover:bg-surface-container-high group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-tertiary-container text-on-tertiary-container rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded-full uppercase tracking-widest">Stable</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-on-surface tracking-tighter">24</div>
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Categories</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 transition-colors hover:bg-surface-container-high group">
          <div className="flex justify-between items-start">
            <div className="p-2.5 bg-primary-fixed text-on-primary-fixed rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">+8%</span>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-on-surface tracking-tighter">456</div>
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">Users</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Line Chart Mock */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-lg font-bold text-on-surface tracking-tight">News Over Time</h2>
              <p className="text-xs text-on-surface-variant font-medium">Weekly engagement trend analytics</p>
            </div>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-surface-container rounded-full text-on-surface-variant">7 Days</button>
              <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-primary">30 Days</button>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2 px-2 relative">
            <div className="absolute inset-0 border-b border-l border-surface-container flex flex-col justify-between py-2 pl-4 text-[10px] text-on-surface-variant font-bold">
              <span>1500</span>
              <span>1000</span>
              <span>500</span>
              <span>0</span>
            </div>
            <div className="flex-grow flex items-end justify-around h-full pl-12">
              <div className="w-full h-3/4 bg-primary-container/40 rounded-t-lg relative group">
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Mon</span>
              </div>
              <div className="w-full h-full bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[85%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Tue</span>
              </div>
              <div className="w-full h-1/2 bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Wed</span>
              </div>
              <div className="w-full h-4/5 bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Thu</span>
              </div>
              <div className="w-full h-3/5 bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Fri</span>
              </div>
              <div className="w-full h-2/3 bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[55%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Sat</span>
              </div>
              <div className="w-full h-5/6 bg-primary-container/40 rounded-t-lg relative">
                <div className="absolute inset-x-0 bottom-0 h-[75%] bg-primary rounded-t-lg"></div>
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-on-surface-variant uppercase">Sun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Mock */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col">
          <h2 className="text-lg font-bold text-on-surface tracking-tight mb-1">Category Distribution</h2>
          <p className="text-xs text-on-surface-variant font-medium mb-10">Article counts by sector</p>
          <div className="flex-grow flex items-center justify-center mb-8">
            <div className="relative w-48 h-48 rounded-full border-[12px] border-primary" style={{ background: 'conic-gradient(#0056d2 0% 40%, #536073 40% 65%, #615b77 65% 85%, #d6e3fb 85% 100%)' }}>
              <div className="absolute inset-0 m-6 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-black text-on-surface">1.2K</div>
                  <div className="text-[8px] font-bold text-on-surface-variant uppercase tracking-tighter">Articles</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="font-medium text-on-surface">Politics</span>
              </div>
              <span className="font-bold text-on-surface">40%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="font-medium text-on-surface">Sports</span>
              </div>
              <span className="font-bold text-on-surface">25%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-medium text-on-surface">Tech</span>
              </div>
              <span className="font-bold text-on-surface">20%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                <span className="font-medium text-on-surface">Entertainment</span>
              </div>
              <span className="font-bold text-on-surface">15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / News Feed Mock */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-lg font-bold text-on-surface tracking-tight">Recent Editorial Updates</h2>
          <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View Archives</button>
        </div>
        <div className="divide-y divide-surface-container-highest/30">
          <div className="p-6 flex items-center justify-between hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex-shrink-0 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1ji8A_x2zqIg7ZzDNMoPxOEsS3lh34g96hRcrvTKTicc0zjUynRwJOgn_8uyzLFCamh3gZ0NP1ic5sCGRAmiaGcXAT4qGUBvpYaGRiNo2P-w5973ZN-3NCZxnfMaLfW2V2dXm4r-kdBdYssnQg5b64wBDL2APv3Iu1B-3EGwe_f0-zPshr4OulC9TcVMn3uh2wVSCwUSvhxxzFayQLCQkvfRqYBd5wnvC5Rnsnqoba6AUoJKeKvkxE6sX7y0aOkzg5q7GtkhciyE" alt="News" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface leading-tight mb-1">Modern Governance: The shift towards digital parliaments</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary-container rounded">Politics</span>
                  <span className="text-[10px] font-medium text-on-surface-variant">By Sarah Miller • 2h ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-widest">Published</span>
              <button className="p-2 text-on-surface-variant"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="p-6 flex items-center justify-between hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex-shrink-0 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDClAIM7YucSpes3gGDFfLXl2d0oh5tE9hpoIn6QkB9-ZiYcko-YRbwPequHFTHQPeI-XxwHJjBLVCxrSmwujPSNj_aFwYt3Oby_nveejdJktPmq_YVhnY_o6AL4msbyCbiirakdIPs8CmsGD3k2c1rgfoGj-PC3xS9vFejo6WCBr4L8-gzlEcMElThFUnMyuk3d-TCnXvft8hC3FlKvPs5PyuP-eZlEMQ47KsnqHWBWoWVF0ypiSr7DyaN0obh81G9WJAY6ilyBd0" alt="News" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface leading-tight mb-1">Silicon Breakthroughs: Quantum computing in the newsroom</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container px-2 py-0.5 bg-tertiary-container rounded">Tech</span>
                  <span className="text-[10px] font-medium text-on-surface-variant">By Alex Chen • 4h ago</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-widest">Draft</span>
              <button className="p-2 text-on-surface-variant"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
