import { ResourceWithOptions } from "adminjs";
import { userResourceOptions } from "./user";
import { Empresa, Prospect, User } from "../../models";
import { prospectResourceOptions } from "./prospect";
import { Supervisor } from "../../models";
import { supervisorResourceOptions } from "./supervisor";
import { empresaResourceOptions } from "./empresa";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: User,
    options: userResourceOptions,
  },
  {
    resource: Prospect,
    options: prospectResourceOptions,
  },
  {
    resource: Supervisor,
    options: supervisorResourceOptions,
  },
  {
    resource: Empresa,
    options: empresaResourceOptions,
  },
];
