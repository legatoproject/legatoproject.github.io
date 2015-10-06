var data = [
			{
				label: 'Guides',
				children: [
					{ label: 'Getting Started' },
					{ label: 'Quick start Guide' }
				]
			},
			{
				label: 'Tutorial',
				children: [
					{ label: 'Sample Apps' },
					{ label: 'Build Apps (some in legato-af)' },
					{ label: 'Technical Notes)' }
				]
			},
			{
				label: 'Tools',
				children: [
					{ label: 'Tools (legato-af)' },
					{ label: 'ADK (or Dev Environment, Software Platform?))' }
				]
			},
			{
				label: 'Reference',
				children: [
					{ label: 'API Guide (legato-af)' },
					{ label: 'Distribution' }
				]
			}
		];
$(function() {
	  $('#tree1').tree({
		  data: data,
		  autoOpen: 0
	  });
  });