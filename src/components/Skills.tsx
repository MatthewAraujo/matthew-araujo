import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import careerData from "@/data/career.json";
import educationData from "@/data/education.json";
import extracurricularData from "@/data/extracurricular.json"
import { careerSchema, educationSchema, extracurricularSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Skills() {
  const career = careerSchema.parse(careerData).career;
  const education = educationSchema.parse(educationData).education;
  const extracurricular = extracurricularSchema.parse(extracurricularData).extracurricular;

  return (
    <Tabs defaultValue="work">
      <TabsList className="mb-2 grid w-full grid-cols-3">
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
      </TabsList>
      <TabsContent value="work">
        <Timeline experience={career}></Timeline>
      </TabsContent>
      <TabsContent value="education">
        <Timeline experience={education}></Timeline>
      </TabsContent>
      <TabsContent value="extracurricular">
        <Timeline experience={extracurricular}></Timeline>
      </TabsContent>
    </Tabs>
  );
}
