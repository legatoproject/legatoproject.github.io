var data1 = [
				{  
					"href": "getstarted_dev_kit_cables.html",
					"label": "Dev Kit Cables",
					"children":
					[
					  {"href": "getstarted_dev_kit_cables.html#getstartedDevKitCables_uart", "label": "UART2"},
					  {"href": "getstarted_dev_kit_cables.html#getstartedDevKitCables_ethernet", "label": "Ethernet"},
					  {"href": "getstarted_dev_kit_cables.html#getstartedDevKitCables_usb", "label": "Micro-USB"}
					]
				}
			];;
/*		
$.getJSON(
    '/serviceAPI.json',
    function(data) {
        $('#tree1').tree({
            data: data
        });
    }
);
*/

 $(function() {
	  $('#tree1').tree({
		  data: data1,
		  autoOpen: 0,
		  autoEscape: false
	  });
	  //bind click event to tree
	  $('#tree1').bind(
		'tree.click',
		function(event) {
        // The clicked node is 'event.node'
        var node = event.node;
        console.log(node.name);
        console.log(node.href);
		}
	  );
	  //bind end
	  
	  /*bind a tag event
	  $("a").bind("click", function(){
		alert("123");
	});*/
	
  });


var data2 = [
			{
				label: '111',
				children: [
					{ label: '1111' },
					{ label: '1111' }
				]
			},
			{
				label: '222',
				children: [
					{ label: '2222' }
				]
			}
		];;

 $(function() {
	  $('#tree2').tree({
		  data: data2,
		  autoOpen: 0
	  });
	  
	  //bind click event to tree
	  $('#tree2').bind(
		'tree.click',
		function(event) {
        // The clicked node is 'event.node'
        var node = event.node;
        alert(node.name);
		}
	  );
	  //bind end
	  
  });
  
  //load extra json file to data
 var data3=[
 {
	
    label: "Services APIs",
    href: "legato_services.html",
    children: [
      {
        label: "Overview",
        href: "legato_services_overview.html"
      },
      {
        label: "AirVantage Connector",
        href: "c_le_avc.html",
        children: {
          label: "Firmware/Application Update",
          href: "c_le_avc.html#c_le_avc_update",
          children: [
            {
              label: "Update Control",
              href: "c_le_avc.html#c_le_avc_update_control"
            },
            {
              label: "Application Blocking",
              href: "c_le_avc.html#c_le_avc_update_app"
            }
          ]
        }
      },
      {
        label: "AirVantage Data",
        href: "c_le_avdata.html",
        children: [
          {
            label: "Asset Data Instances",
            href: "c_le_avdata.html#le_avdata_instance"
          },
          {
            label: "Field Values and Activity",
            href: "c_le_avdata.html#le_avdata_field"
          }
        ]
      },
      {
        label: "ADC Channel API",
        href: "c_adc.html"
      },
      {
        label: "Application Information API",
        href: "c_app_info.html"
      },
      {
        label: "Antenna Monitoring",
        href: "c_antenna.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_antenna.html#le_antenna_binding"
          },
          {
            label: "Cellular or Diversity antenna",
            href: "c_antenna.html#le_antenna_cell_section",
            children: [
              {
                label: "Diagnostics principle",
                href: "c_antenna.html#le_antenna_cell_diag_subsection"
              },
              {
                label: "Thresholds",
                href: "c_antenna.html#le_antenna_cell_thres_subsection"
              }
            ]
          },
          {
            label: "GNSS antenna",
            href: "c_antenna.html#le_antenna_gnss_section",
            children: [
              {
                label: "Diagnostics principle",
                href: "c_antenna.html#le_antenna_gnss_diag_subsection"
              },
              {
                label: "Thresholds",
                href: "c_antenna.html#le_antenna_gnss_thre_subsection"
              }
            ]
          },
          {
            label: "Antenna diagnostic ADC selection",
            href: "c_antenna.html#le_antenna_gnss_diag_adc_selection"
          },
          {
            label: "API description",
            href: "c_antenna.html#API_desc"
          }
        ]
      },
      {
        label: "Audio",
        href: "c_audio.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_audio.html#le_audio_binding"
          },
          {
            label: "Configure the Audio",
            href: "c_audio.html#le_audio_configuration"
          },
          {
            label: "Open/Close an Audio Interface",
            href: "c_audio.html#le_audio_interfaces"
          },
          {
            label: "Control an Audio Stream",
            href: "c_audio.html#le_audio_streams"
          },
          {
            label: "Create Audio connectors",
            href: "c_audio.html#le_audio_connectors"
          },
          {
            label: "Playback and Recording",
            href: "c_audio.html#le_audio_pb_rec"
          },
          {
            label: "DTMF",
            href: "c_audio.html#le_audio_dtmf"
          },
          {
            label: "Code samples",
            href: "c_audio.html#le_audio_samples"
          }
        ]
      },
      {
        label: "Cellular Network",
        href: "c_le_cellnet.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_le_cellnet.html#le_cellnet_binding"
          },
          {
            label: "Requesting the Cellular Network",
            href: "c_le_cellnet.html#c_le_cellnet_requesting"
          },
          {
            label: "Network Options",
            href: "c_le_cellnet.html#c_le_cellnet_options"
          },
          {
            label: "Cellular Network configuration tree",
            href: "c_le_cellnet.html#c_le_cellnet_configdb"
          }
        ]
      },
      {
        label: "Config Tree",
        href: "legato_services_config_tree.html",
        children: [
          {
            label: "Config Tree API",
            href: "c_config.html",
            children: [
              {
                label: "Read and Write Transactions",
                href: "c_config.html#cfg_transaction"
              },
              {
                label: "Iterating the Tree",
                href: "c_config.html#cfg_iteration"
              },
              {
                label: "Writing Configuration Data",
                href: "c_config.html#cfg_transactWrite"
              },
              {
                label: "Reading Configuration Data",
                href: "c_config.html#cfg_transactRead"
              },
              {
                label: "Working without Transactions",
                href: "c_config.html#cfg_quick"
              }
            ]
          },
          {
            label: "Config Tree Entries",
            href: "config_tree_page.html",
            children: [
              {
                label: "Cellular Network Service",
                href: "config_tree_page.html#cellnetConfigTree"
              },
              {
                label: "SMS Inbox Service",
                href: "config_tree_page.html#mbxConfigTree"
              },
              {
                label: "eCall",
                href: "config_tree_page.html#ecallConfigTree"
              },
              {
                label: "Positioning",
                href: "config_tree_page.html#posConfigTree"
              }
            ]
          },
          {
            label: "Config Tree Admin API",
            href: "c_config_admin.html"
          }
        ]
      },
      {
        label: "Data Connection",
        href: "c_le_data.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_le_data.html#le_data_binding"
          },
          {
            label: "Default Data Connection",
            href: "c_le_data.html#c_le_data_default"
          },
          {
            label: "Configuration tree",
            href: "c_le_data.html#c_le_data_configdb"
          },
          {
            label: "Data Connection Options",
            href: "c_le_data.html#c_le_data_options"
          }
        ]
      },
      {
        label: "eCall",
        href: "c_ecall.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_ecall.html#le_ecall_binding"
          },
          {
            label: "Operation modes",
            href: "c_ecall.html#le_ecall_operation"
          },
          {
            label: "eCall Session",
            href: "c_ecall.html#le_ecall_session"
          },
          {
            label: "Minimum Set of Data (MSD)",
            href: "c_ecall.html#le_ecall_msd"
          },
          {
            label: "Concurrency",
            href: "c_ecall.html#le_ecall_concurrency"
          },
          {
            label: "ERA-GLONASS compliancy",
            href: "c_ecall.html#le_ecall_eraglonass"
          },
          {
            label: "ERA-GLONASS MSD additional data",
            href: "c_ecall.html#le_ecall_eraGlonassData"
          },
          {
            label: "Redial management",
            href: "c_ecall.html#le_ecall_redial"
          },
          {
            label: "Code sample",
            href: "c_ecall.html#le_ecall_samples"
          },
          {
            label: "eCall configuration",
            href: "c_ecall.html#le_ecall_configuration"
          },
          {
            label: "Configuration tree",
            href: "c_ecall.html#le_ecall_configdb"
          },
          {
            label: "eCallDemo Application and utility",
            href: "c_ecall_app_main.html",
            children: [
              {
                label: "eCallDemo application",
                href: "c_ecall_app.html"
              },
              {
                label: "'trig' utility for eCallDemo application",
                href: "c_ecall_app_trigg.html"
              }
            ]
          }
        ]
      },
      {
        label: "GNSS",
        href: "c_gnss.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_gnss.html#le_gnss_binding"
          },
          {
            label: "Enable/Disable GNSS device",
            href: "c_gnss.html#le_gnss_EnableDisable"
          },
          {
            label: "Start/Stop GNSS device",
            href: "c_gnss.html#le_gnss_StartStop"
          },
          {
            label: "Force cold restart",
            href: "c_gnss.html#le_gnss_ForceColdRestart"
          },
          {
            label: "GNSS constellation selection",
            href: "c_gnss.html#le_gnss_SetGetConstellation"
          },
          {
            label: "Assisted GNSS",
            href: "c_gnss.html#le_gnss_Assisted_GNSS",
            children: [
              {
                label: "Server based Extended Ephemeris",
                href: "c_gnss.html#le_gnss_Assisted_GNSS_EE"
              },
              {
                label: "3GPP User Plane (OMA SUPL)",
                href: "c_gnss.html#le_gnss_Assisted_GNSS_UP"
              }
            ]
          }
        ]
      },
      {
        label: "Input Power Supply Monitoring API",
        href: "c_ips.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_ips.html#le_ips_binding"
          },
          {
            label: "Power Supply Monitoring",
            href: "c_ips.html#Input"
          }
        ]
      },
      {
        label: "Install Status API",
        href: "c_le_inst_stat.html"
      },
      {
        label: "Modem Call Control",
        href: "c_mcc.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_mcc.html#le_mcc_binding"
          },
          {
            label: "Starting a Call",
            href: "c_mcc.html#le_mcc_starting_a_call"
          },
          {
            label: "Answering a call",
            href: "c_mcc.html#le_mcc_answering_a_call"
          },
          {
            label: "Ending all calls",
            href: "c_mcc.html#le_mcc_ending_all_call"
          },
          {
            label: "Supplementary service.",
            href: "c_mcc.html#le_mcc_ss"
          }
        ]
      },
      {
        label: "Modem Data Control",
        href: "c_mdc.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_mdc.html#le_mdc_binding"
          },
          {
            label: "Data Profiles",
            href: "c_mdc.html#le_mdc_profile"
          },
          {
            label: "Data Sessions",
            href: "c_mdc.html#le_mdc_session"
          },
          {
            label: "Data Statistics",
            href: "c_mdc.html#le_mdc_dataStatistics"
          }
        ]
      },
      {
        label: "Modem Firmware Update",
        href: "c_fwupdate.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_fwupdate.html#le_fwupdate_binding"
          },
          {
            label: "Update Firmware Image",
            href: "c_fwupdate.html#le_fwupdate_image"
          }
        ]
      },
      {
        label: "Modem Information",
        href: "c_info.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_info.html#le_info_binding"
          },
          {
            label: "Query Firmware Version",
            href: "c_info.html#le_info_version"
          },
          {
            label: "Query Device information",
            href: "c_info.html#le_info_model"
          }
        ]
      },
      {
        label: "Modem Radio Control",
        href: "c_mrc.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_mrc.html#le_mrc_binding"
          },
          {
            label: "Radio Power Management",
            href: "c_mrc.html#le_mrc_power"
          },
          {
            label: "Radio Configuration preferences",
            href: "c_mrc.html#le_mrc_configuration"
          },
          {
            label: "Radio Access Technology (RAT)",
            href: "c_mrc.html#le_mrc_rat"
          },
          {
            label: "Network Registration",
            href: "c_mrc.html#le_mrc_registration"
          },
          {
            label: "Signal Quality",
            href: "c_mrc.html#le_mrc_signal"
          },
          {
            label: "Serving cell's location information",
            href: "c_mrc.html#le_mrc_location"
          },
          {
            label: "Current Network Information",
            href: "c_mrc.html#le_mrc_network_information"
          },
          {
            label: "Network Scan",
            href: "c_mrc.html#le_mrc_networkScan"
          },
          {
            label: "Neighboring Cells Information",
            href: "c_mrc.html#le_mrc_ngbr"
          }
        ]
      },
      {
        label: "Positioning",
        href: "c_pos.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_pos.html#le_pos_binding"
          },
          {
            label: "Fix On Demand",
            href: "c_pos.html#le_pos_fix"
          },
          {
            label: "Navigation",
            href: "c_pos.html#le_pos_navigation"
          },
          {
            label: "Positioning configuration tree",
            href: "c_pos.html#le_pos_configdb"
          },
          {
            label: "Positioning Control API",
            href: "c_pos_ctrl.html",
            children: [
              {
                label: "IPC interfaces binding",
                href: "c_pos_ctrl.html#le_posCtrl_binding"
              },
              {
                label: "Positioning control",
                href: "c_pos_ctrl.html#le_posCtrl_ctrl"
              }
            ]
          }
        ]
      },
      {
        label: "Power Manager",
        href: "c_pm.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_pm.html#le_pm_binding"
          },
          {
            label: "Requesting and releasing a wakeup source",
            href: "c_pm.html#le_pm_request"
          }
        ]
      },
      {
        label: "Ring Indicator Signal",
        href: "c_ri_pin.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_ri_pin.html#c_riPin_binding"
          },
          {
            label: "Ring Indication signal",
            href: "c_ri_pin.html#c_riPin_usage"
          }
        ]
      },
      {
        label: "Secure Storage",
        href: "c_sec_store.html"
      },
      {
        label: "SIM",
        href: "c_sim.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_sim.html#le_sim_binding"
          },
          {
            label: "Select a card to use",
            href: "c_sim.html#le_sim_SelectCard"
          },
          {
            label: "SIM identification information",
            href: "c_sim.html#le_sim_id"
          },
          {
            label: "SIM Authentication",
            href: "c_sim.html#le_sim_auth"
          },
          {
            label: "SIM states",
            href: "c_sim.html#le_sim_state"
          },
          {
            label: "Local SIM profile switch",
            href: "c_sim.html#le_sim_profile_switch"
          },
          {
            label: "SIM Toolkit",
            href: "c_sim.html#le_sim_stk"
          }
        ]
      },
      {
        label: "SMS",
        href: "c_sms.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_sms.html#le_sms_binding"
          },
          {
            label: "Creating a Message object",
            href: "c_sms.html#le_sms_ops_creating_msg"
          },
          {
            label: "Deleting a Message object",
            href: "c_sms.html#le_sms_ops_deleting_msg"
          },
          {
            label: "Sending a message",
            href: "c_sms.html#le_sms_ops_sending"
          },
          {
            label: "Sending asynchronously a message.",
            href: "c_sms.html#le_sms_ops_async_sending"
          },
          {
            label: "Receiving a message",
            href: "c_sms.html#le_sms_ops_receiving"
          },
          {
            label: "Listing  messages recorded in storage area",
            href: "c_sms.html#le_sms_ops_listing"
          },
          {
            label: "Deleting a message from the storage area",
            href: "c_sms.html#le_sms_ops_deleting"
          },
          {
            label: "SMS Cell Broadcast",
            href: "c_sms.html#le_sms_ops_broadcast"
          },
          {
            label: "SMS Cell Broadcast configuration",
            href: "c_sms.html#le_sms_ops_broadcast_configuration"
          },
          {
            label: "SMS configuration",
            href: "c_sms.html#le_sms_ops_configuration"
          },
          {
            label: "Sample codes",
            href: "c_sms.html#le_sms_ops_samples"
          },
          {
            label: "Sample code for Mobile Originated SMS message",
            href: "c_sms_sample_m_o.html"
          },
          {
            label: "Sample code for Mobile Terminated SMS message",
            href: "c_sms_sample_m_t.html"
          }
        ]
      },
      {
        label: "SMS Inbox Service",
        href: "c_sms_inbox.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_sms_inbox.html#le_smsInbox_binding"
          },
          {
            label: "Initialise a message box",
            href: "c_sms_inbox.html#le_smsInbox_init"
          },
          {
            label: "Receiving a message",
            href: "c_sms_inbox.html#le_smsInbox_receiving"
          },
          {
            label: "Getting received messages",
            href: "c_sms_inbox.html#le_smsInbox_listing"
          },
          {
            label: "Deleting a message",
            href: "c_sms_inbox.html#le_smsInbox1_deleting"
          },
          {
            label: "Close a message box",
            href: "c_sms_inbox.html#le_smsInbox_end"
          },
          {
            label: "Configuration tree",
            href: "c_sms_inbox.html#le_smsInbox_configdb"
          }
        ]
      },
      {
        label: "Software Update",
        href: "c_update.html",
        children: [
          {
            label: "API Usage Guideline",
            href: "c_update.html#API_Usage_Guideline"
          },
          {
            label: "Sample Code",
            href: "c_update.html#update_example"
          }
        ]
      },
      {
        label: "Supervisor",
        href: "legato_services_supervisor.html",
        children: {
          label: "Supervisor Control API",
          href: "c_sup_ctrl.html",
          children: [
            {
              label: "Binding",
              href: "c_sup_ctrl.html#legatoServicesSupervisor_binding"
            },
            {
              label: "Start App",
              href: "c_sup_ctrl.html#legatoServicesSupervisor_start"
            },
            {
              label: "Stop App",
              href: "c_sup_ctrl.html#legatoServicesSupervisor_stop"
            }
          ]
        }
      },
      {
        label: "Temperature Monitoring",
        href: "c_temp.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_temp.html#le_temp_binding"
          },
          {
            label: "Radio Temperature Thresholds",
            href: "c_temp.html#c_temp_radio"
          },
          {
            label: "Platform Temperature Thresholds",
            href: "c_temp.html#c_temp_platform"
          },
          {
            label: "Monitoring",
            href: "c_temp.html#Temperature"
          }
        ]
      },
      {
        label: "Voice Call Service",
        href: "c_le_voicecall.html",
        children: [
          {
            label: "IPC interfaces binding",
            href: "c_le_voicecall.html#le_voicecall_binding"
          },
          {
            label: "Starting a Voice call",
            href: "c_le_voicecall.html#c_le_voicecall_outgoing"
          },
          {
            label: "Answering a Voice call",
            href: "c_le_voicecall.html#c_le_voicecall_incoming"
          },
          {
            label: "Voice call Options",
            href: "c_le_voicecall.html#c_le_voicecall_options"
          }
        ]
      },
      {
        label: "Watchdog Service",
        href: "c_wdog.html"
      }
    ]
  
}

 ]
 $(function() {
	  $('#tree3').tree({
		  data: data3,
		  autoOpen: 0
		  //dragAndDrop: true,
		  //autoscroll:true
	  });
	  
	  //bind click event to tree
	  $('#tree3').bind(
		'tree.click',
		function(event) {
        // The clicked node is 'event.node'
        var node = event.node;
        console.log(node.name);
        console.log(node.href);
        $('.content').html(node.href);
		}
	  );
	  //bind end
	  
  });
  
  
