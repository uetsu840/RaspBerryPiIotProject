export class DashboardDataControl {
    is_control_panel_valid: boolean;
    is_signal_data_valid: boolean;
    is_switch_data_valid: boolean;
    is_section_data_valid: boolean;

    constructor () {
        this.is_control_panel_valid = false;
        this.is_signal_data_valid = false;
        this.is_switch_data_valid = false;
        this.is_section_data_valid = false;
    }

    private is_all_data_valid(): boolean {
        if (this.is_control_panel_valid
            && this.is_signal_data_valid
            && this.is_switch_data_valid
            && this.is_section_data_valid) {
                return true;
        }
        return false;
    }

    set_control_panel_valid(): boolean {
        this.is_control_panel_valid = true;
        return this.is_all_data_valid();
    }

    set_signal_data_valid(): boolean {
        this.is_signal_data_valid = true;
        return this.is_all_data_valid();
    }

    set_switch_data_valid(): boolean {
        this.is_switch_data_valid = true;
        return this.is_all_data_valid();
    }

    set_section_data_valid(): boolean {
        this.is_section_data_valid = true;
        return this.is_all_data_valid();
    }
}
