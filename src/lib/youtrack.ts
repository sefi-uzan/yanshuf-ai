import { Issue, Projects } from "@/types/types";
import axios, { AxiosInstance } from "axios";
export class Youtrack {
  baseUrl: string;
  token: string;
  axios: AxiosInstance;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;

    this.axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  async getProjcets() {
    return await this.axios.get<Projects[]>(
      "/api/admin/projects?fields=id,shortName"
    );
  }

  async getProjcetIssues(projectId: string) {
    return await this.axios.get<Issue[]>(
      `/api/admin/projects/${projectId}/issues?fields=id,summary,description,created,updated,customFields(id,name,value(id,name))`
    );
  }

  async getProjectCustomFields(projectId: string) {
    return await this.axios.get<Issue[]>(
      `/api/admin/projects/${projectId}/customFields?fields=id,field(name)`
    );
  }

  async searchProjectIssues(query?: string) {
    return await this.axios.get<Issue[]>(
      `/api/issues?query=${encodeURIComponent(
        query || ""
      )}&fields=id,summary,description,created,updated,customFields(id,name,value(id,name))
      `
    );
  }
}
