import TagBadge from './TagBadge';
import StatusBadge from './StatusBadge';

export default function LeadTable({ leads, onLeadClick }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-surface rounded-xl border border-border">
        <p className="text-muted">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-surface border border-border rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Follow-ups</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => onLeadClick && onLeadClick(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-primary">{lead.name}</span>
                    <span className="text-xs text-muted">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TagBadge tag={lead.tag || lead.ai_tag} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {lead.source || 'Meta Ads'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {lead.last_contact || lead.last_message_at ? new Date(lead.last_contact || lead.last_message_at).toLocaleDateString() : 'Never'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">
                  {lead.followup_count || lead.follow_up_count || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
