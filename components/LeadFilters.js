export default function LeadFilters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-xs font-medium text-muted mb-1 uppercase">Tag</label>
        <select
          name="tag"
          value={filters.tag || ''}
          onChange={handleChange}
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
        >
          <option value="">All Tags</option>
          <option value="HOT">HOT</option>
          <option value="WARM">WARM</option>
          <option value="COLD">COLD</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1 uppercase">Status</label>
        <select
          name="status"
          value={filters.status || ''}
          onChange={handleChange}
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="appointment_booked">Appointment Booked</option>
          <option value="closed">Closed</option>
          <option value="dead">Dead</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1 uppercase">Source</label>
        <select
          name="source"
          value={filters.source || ''}
          onChange={handleChange}
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
        >
          <option value="">All Sources</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Direct">Direct</option>
          <option value="Referral">Referral</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-1 uppercase">Search</label>
        <input
          type="text"
          name="search"
          placeholder="Name or Phone..."
          value={filters.search || ''}
          onChange={handleChange}
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-primary focus:ring-accent focus:border-accent outline-none"
        />
      </div>
    </div>
  );
}
