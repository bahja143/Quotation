import JwtDecode from "jwt-decode";

const user = localStorage["token"] ? JwtDecode(localStorage["token"]) : null;

const adminMenus = {
  items: [
    {
      id: "ui-forms",
      title: "Home",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/",
        },
      ],
    },
    {
      id: "navigation",
      title: "Setup",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "setup",
          title: "Setup",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "Customers",
              title: "Customers",
              type: "item",
              url: "/setup/customers",
            },
            {
              id: "Companies",
              title: "Companies",
              type: "item",
              url: "/setup/companies",
            },
            {
              id: "Branches",
              title: "Branches",
              type: "item",
              url: "/setup/branches",
            },
            {
              id: "Users",
              title: "Users",
              type: "item",
              url: "/setup/users",
            },
          ],
        },
      ],
    },
    {
      id: "Quotation",
      title: "Quotation",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Quotation from",
          title: "Quotation Form",
          type: "item",
          icon: "feather icon-file",
          url: "/quotation/form",
        },
        {
          id: "Quotations",
          title: "Quotations",
          type: "item",
          icon: "feather icon-file-text",
          url: "/quotation/quotations",
        },
      ],
    },
    {
      id: "Report",
      title: "Report",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Quotation Report",
          title: "Quotation Report",
          type: "item",
          icon: "fas fa-chart-simple",
          url: "/quotation/report",
        },
      ],
    },
  ],
};

const userMenus = {
  items: [
    {
      id: "ui-forms",
      title: "Home",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/",
        },
      ],
    },
    {
      id: "navigation",
      title: "Setup",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "setup",
          title: "Setup",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "Customers",
              title: "Customers",
              type: "item",
              url: "/setup/customers",
            },
            {
              id: "Companies",
              title: "Companies",
              type: "item",
              url: "/setup/companies",
            },
            {
              id: "Branches",
              title: "Branches",
              type: "item",
              url: "/setup/branches",
            },
            // {
            //   id: "Users",
            //   title: "Users",
            //   type: "item",
            //   url: "/setup/users",
            // },
          ],
        },
      ],
    },
    {
      id: "Quotation",
      title: "Quotation",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Quotation from",
          title: "Quotation Form",
          type: "item",
          icon: "feather icon-file",
          url: "/quotation/form",
        },
        {
          id: "Quotations",
          title: "Quotations",
          type: "item",
          icon: "feather icon-file-text",
          url: "/quotation/quotations",
        },
      ],
    },
    {
      id: "Report",
      title: "Report",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Quotation Report",
          title: "Quotation Report",
          type: "item",
          icon: "feather icon-file",
          url: "/quotation/report",
        },
      ],
    },
  ],
};

export default user
  ? user.role === "admin"
    ? adminMenus
    : userMenus
  : userMenus;
