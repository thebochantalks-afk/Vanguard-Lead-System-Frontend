/**
 * Legacy LoadingSkeleton — now delegates to the premium SkeletonLoader component.
 * Kept for backward compatibility.
 */
import SkeletonLoader from './SkeletonLoader';

export default function LoadingSkeleton(props) {
  return <SkeletonLoader {...props} />;
}