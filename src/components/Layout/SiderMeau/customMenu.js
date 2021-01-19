import { UsergroupDeleteOutlined, ProjectOutlined, AuditOutlined,PieChartOutlined } from '@ant-design/icons';
const menuData = [
  {
    title: 'xx列表',
    selected: 'lists',
    permission: "item-mgt",
    icon: <PieChartOutlined />,
    children: [
      {
        title: '示例列表',
        selected: 'list',
        permission: "item-list",
        path: '/list'
      },
      {
        title: '示例内容',
        selected: 'example',
        permission: "user-mgt",
        path: '/example'
      },
    ]
  },
];

export default menuData