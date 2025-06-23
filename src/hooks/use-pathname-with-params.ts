import { useParams, usePathname, useSearchParams } from 'next/navigation';

export function usePathnameWithParams() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  // Convert params object to URL path segments
  const pathSegments = Object.entries(params)
    .map(([_, value]) => `/${String(value)}`)
    .join('');

  // Get search parameters as string
  const searchString = searchParams.toString();

  return pathname + pathSegments + (searchString ? `?${searchString}` : '');
}
