import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminFromRequest } from "@/lib/auth";
import { upsertResume } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const user = await requireAdminFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const importType = formData.get("importType") as string; // "json" or "csv"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileContent = await file.text();
    let resumeData;

    if (importType === "json") {
      resumeData = JSON.parse(fileContent);
    } else if (importType === "csv") {
      resumeData = parseCSV(fileContent);
    } else {
      return NextResponse.json(
        { error: "Invalid import type" },
        { status: 400 }
      );
    }

    // Process and validate the data
    const processedData = validateResumeData(resumeData);

    // Handle image files if provided
    const profileImageFile = formData.get("image_profileImage") as File | null;
    if (profileImageFile) {
      try {
        const imageBuffer = await profileImageFile.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString("base64");
        const mimeType = profileImageFile.type || "image/jpeg";
        processedData.profileImageUrl = `data:${mimeType};base64,${base64Image}`;
      } catch (imageError) {
        console.warn("Failed to process profile image:", imageError);
        // Continue without image if it fails
      }
    }

    const resume = await upsertResume(processedData);

    revalidatePath("/admin/curriculum");
    revalidatePath("/admin");

    return NextResponse.json({
      success: true,
      resume,
      message: "Currículo importado com sucesso!",
    });
  } catch (error) {
    console.error("Error importing resume:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to import resume",
      },
      { status: 500 }
    );
  }
}

function parseCSV(content: string): any {
  const lines = content.split("\n").filter(line => line.trim());
  if (lines.length === 0) return {};
  
  const headers = lines[0].split(",").map((h) => h.trim());
  const data: any = {
    experiences: [],
    educations: [],
    certifications: [],
    languages: []
  };

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    if (values.length === 0) continue;

    headers.forEach((header, index) => {
      const value = values[index] || "";
      
      if (!header.includes("_")) {
        data[header] = value;
      }
    });
  }

  return data;
}

function validateResumeData(data: any): any {
  return {
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || null,
    location: data.location || null,
    profileImageUrl: data.profileImageUrl || null,
    profileImageAlt: data.profileImageAlt || "Foto de perfil",
    professionalSummary: data.professionalSummary || "",
    nationalId: data.nationalId || null,
    linkedinUrl: data.linkedinUrl || null,
    portfolioUrl: data.portfolioUrl || null,
    githubUrl: data.githubUrl || null,
    status: data.status || "DRAFT",
    experiences: Array.isArray(data.experiences)
      ? data.experiences.map((exp: any) => ({
          company: exp.company || "",
          position: exp.position || "",
          description: exp.description || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || null,
          isCurrent: exp.isCurrent || false,
          skills: Array.isArray(exp.skills) ? exp.skills : (exp.skills ? [exp.skills] : []),
          imageUrl: exp.imageUrl || null,
          imageAlt: exp.imageAlt || null,
        }))
      : [],
    educations: Array.isArray(data.educations)
      ? data.educations.map((edu: any) => ({
          institution: edu.institution || "",
          course: edu.course || "",
          degree: edu.degree || null,
          area: edu.area || null,
          startDate: edu.startDate || "",
          endDate: edu.endDate || null,
          isCurrent: edu.isCurrent || false,
          description: edu.description || null,
          imageUrl: edu.imageUrl || null,
          imageAlt: edu.imageAlt || null,
        }))
      : [],
    certifications: Array.isArray(data.certifications)
      ? data.certifications.map((cert: any) => ({
          title: cert.title || "",
          issuer: cert.issuer || "",
          credentialUrl: cert.credentialUrl || null,
          issueDate: cert.issueDate || "",
          expiryDate: cert.expiryDate || null,
          imageUrl: cert.imageUrl || null,
          imageAlt: cert.imageAlt || null,
        }))
      : [],
    languages: Array.isArray(data.languages)
      ? data.languages.map((lang: any) => ({
          name: lang.name || "",
          proficiency: lang.proficiency || "Intermediário",
        }))
      : [],
  };
}
