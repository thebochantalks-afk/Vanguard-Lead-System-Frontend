import TagBadge from './TagBadge';
import StatusBadge from './StatusBadge';

export default function LeadTable({ leads, onLeadClick }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-3">
          <svg className="h-6 w-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-sm font-medium text-primary mb-0.5">No leads found</p>
        <p className="text-xs text-muted">Leads will appear here once captured from your campaigns</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/[0.06]">
          <thead>
            <tr className="bg-white/[0.02]">
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Name</th>
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Source</th>
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Last Contact</th>
              <th className="px-6 py-3.5 text-left text-2xs font-semibold text-muted uppercase tracking-wider">Follow-ups</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                onClick={() => onLeadClick && onLeadClick(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">{lead.name}</span>
                    <span className="text-xs text-muted">{lead.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TagBadge tag={lead.tag || lead.ai_tag} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-muted">{lead.source || 'Meta Ads'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-muted">
                    {lead.last_contact || lead.last_message_at 
                      ? new Date(lead.last_contact || lead.last_message_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                      : <span className="text-muted/50">Never</span>}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-muted">
                    {lead.followup_count || lead.follow_up_count || 0}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}