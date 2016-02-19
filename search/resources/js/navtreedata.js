var data = [
			{
				label: 'Documentation',
				children: [
					{ label: 'Guides' },
					{ label: 'Getting Started' }
				]
			},
			{
				label: 'Concepts',
				children: [
					{ label: 'Build Apps (some in legato-af)' }
				]
			}
		];
$(function() {
	  $('#tree1').tree({
		  data: data,
		  autoOpen: 0
	  });
  });