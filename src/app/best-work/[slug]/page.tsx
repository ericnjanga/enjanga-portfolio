interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => (
  <div>
    <h1>Project page: {params.slug}</h1>
  </div>
);

export default ProjectPage;
