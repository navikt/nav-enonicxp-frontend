export interface DynamicSupervisorPanel {
    type: 'part';
    path: string;
    descriptor: 'no.nav.navno:dynamic-supervisor-panel';
    regions: undefined;
    part: {
        config: {
            no_nav_navno: {
                dynamic_supervisor_panel: {
                    content: string;
                };
            };
        };
    };
}
