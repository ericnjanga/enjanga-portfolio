import { Button } from 'enjanga-components-library';
import type { LinkData } from '@/lib/contentful/models';

export default function ArrowLink({ link }: { link: LinkData }) {
  return <Button variant="primary" icon="chevron-right" href={link.href}
    aria-label={link.accessibleLabel || link.label}
    target={link.openInNewTab ? '_blank' : undefined}
    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}>
    {link.label}
  </Button>;
}
