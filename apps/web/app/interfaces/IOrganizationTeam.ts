import { IEmployee } from './IEmployee';
import { ITeamTask } from './ITask';

export interface IOrganizationTeamCreate {
	name: string;
	memberIds?: string[];
	managerIds?: string[];
	tags?: any[];
	organizationId: string;
	tenantId: string;
	public?: boolean;
}

export type IOrganizationTeamUpdate = IOrganizationTeamCreate & { id: string };

export interface IOrganizationTeam {
	tenantId: string;
	organizationId: string;
	name: string;
	prefix: string;
	tenant: {
		id: string;
	};
	members: any[];
	tags: any[];
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IOrganizationTeamList {
	id: string;
	createdAt: string;
	updatedAt: string;
	tenantId: string;
	organizationId: string;
	name: string;
	updated?: boolean;
	prefix: string;
	members: OT_Member[];
	public?: boolean;
}

export type IOrganizationTeamWithMStatus = IOrganizationTeamList;

export interface OT_Member {
	id: string;
	createdAt: string;
	updatedAt: string;
	tenantId: any;
	organizationId: any;
	organizationTeamId: string;
	employeeId: string;
	roleId?: string;
	role?: OT_Role;
	employee: IEmployee;
	lastWorkedTask?: ITeamTask;
	running?: boolean;
	duration?: number;
}

interface OT_Role {
	id: string;
	createdAt: string;
	updatedAt: string;
	tenantId: string;
	name: string;
	isSystem: boolean;
}
