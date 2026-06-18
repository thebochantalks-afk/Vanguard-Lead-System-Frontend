export default function LeadFilters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-5 sm:p-6">
      <div>
        <label className="block text-2xs font-medium text-muted mb-1.5 uppercase tracking-wider">Tag</label>
        <select
          name="tag"
          value={filters.tag || ''}
          onChange={handleChange}
          className="select-premium"
        >
          <option value="">All Tags</option>
          <option value="HOT">HOT</option>
          <option value="WARM">WARM</option>
          <option value="COLD">COLD</option>
        </select>
      </div>
      <div>
        <label className="block text-2xs font-medium text-muted mb-1.5 uppercase tracking-wider">Status</label>
        <select
          name="status"
          value={filters.status || ''}
          onChange={handleChange}
          className="select-premium"
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
        <label className="block text-2xs font-medium text-muted mb-1.5 uppercase tracking-wider">Source</label>
        <select
          name="source"
          value={filters.source || ''}
          onChange={handleChange}
          className="select-premium"
        >
          <option value="">All Sources</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Direct">Direct</option>
          <option value="Referral">Referral</option>
        </select>
      </div>
      <div>
        <label className="block text-2xs font-medium text-muted mb-1.5 uppercase tracking-wider">Search</label>
        <input
          type="text"
          name="search"
          placeholder="Name or phone..."
          value={filters.search || ''}
          onChange={handleChange}
          className="input-premium"
        />
      </div>
    </div>
  );
}