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
    return await this.axios.get("/api/admin/projects?fields=id,shortName");
  }

  async getProjcetIssues(projectId: string) {
    return await this.axios.get(
      `/api/admin/projects/${projectId}/issues?fields=id,type,description,summary`
    );
  }
}
