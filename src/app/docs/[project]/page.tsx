import { redirect } from 'next/navigation';

export default async function ProjectDocsIndexPage(props: {
  params: Promise<{ project: string }>;
}) {
  const params = await props.params;
  redirect(`/docs/${params.project}/portal-readme`);
}
