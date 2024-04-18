import React, { useEffect, useState } from "react";
import { useGetAllQuoteQuery } from "features/Quotes/quoteSlice";
import { useGetAllVisitorsQuery } from "features/Visitor/visitorSlice";

const Navdata = () => {
  //state data

  const [isTracking, setIsTracking] = useState(false);
  const [isVisitorQuote, setIsVisitorQuote] = useState(false);
  const [isCorporateTransport, setIsCorporateTransport] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [isFeedbackClaims, setIsFeedbackClaims] = useState(false);
  const [isReportingManagement, setIsReportingManagement] = useState(false);
  const [isEmailTemplates, setIsEmailTemplates] = useState(false);
  const [isAdministration, setIsAdministration] = useState(false);
  const [isProgramming, setIsProgramming] = useState(false);
  const [isRevelance, setIsRevelance] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const { data: allQuotes = [] } = useGetAllQuoteQuery();
  let resultPendingQuotes = allQuotes.filter(
    (pendingQuotes) => pendingQuotes.progress === "New"
  );
  const { data: allVisitors = [] } = useGetAllVisitorsQuery();
  const new_visitor = allVisitors.filter((visitors) => visitors?.status === "new")
  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);
  const [isLevel3, setIsLevel3] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (iscurrentState !== "Tracking") {
      setIsTracking(false);
    }
    if (iscurrentState !== "Programming") {
      setIsProgramming(false);
    }
    if (iscurrentState !== "Help") {
      setIsHelp(false);
    }
    if (iscurrentState !== "Revelance") {
      setIsRevelance(false);
    }
    if (iscurrentState !== "VisitorQuote") {
      setIsVisitorQuote(false);
    }
    if (iscurrentState !== "CorporateTransport") {
      setIsCorporateTransport(false);
    }
    if (iscurrentState !== "Corporate") {
      setIsCorporate(false);
    }
    if (iscurrentState !== "Feedback&Claims") {
      setIsFeedbackClaims(false);
    }
    if (iscurrentState !== "ReportingManagement") {
      setIsReportingManagement(false);
    }
    if (iscurrentState !== "EmailTemplates") {
      setIsEmailTemplates(false);
    }
    if (iscurrentState !== "Administration") {
      setIsAdministration(false);
    }
  }, [
    iscurrentState,
    isProgramming,
    isEmailTemplates,
    isTracking,
    isVisitorQuote,
    isCorporateTransport,
    isCorporate,
    isFeedbackClaims,
    isReportingManagement,
    isAdministration,
    isRevelance,
    isHelp,
  ]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "mdi mdi-view-dashboard",
      link: "/dashboard",
    },
    {
      id: "mapTracking",
      label: "Tracking",
      icon: "mdi mdi-map",
      link: "/map-tracking",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: "mdi mdi-briefcase-edit",
      link: "/#",
      badgeName: `${resultPendingQuotes.length}`,
      badgeColor: "info",
      badgeName1: `${new_visitor.length}`,
      badgeColor1: "danger",
      click: function (e: any) {
        e.preventDefault();
        setIsTracking(!isTracking);
        setIscurrentState("Tracking");
        updateIconSidebar(e);
      },
      stateVariables: isTracking,
      subItems: [
        {
          id: "newQuote",
          label: "New Job",
          link: "/new-quote",
          icon: "mdi mdi-file-document-edit",
          parentId: "jobs",
        },
        {
          id: "QuoteRequests",
          label: "Latest Quotes",
          icon: "mdi mdi-lightning-bolt",
          link: "/latest-quotes",
          parentId: "jobs",
        },
        {
          id: "AllQuotes",
          label: "Pending Quotes",
          icon: "mdi mdi-history",
          link: "/pending-quotes",
          parentId: "jobs",
          badgeName: `${resultPendingQuotes.length}`,
          badgeColor: "info",
        },
        {
          id: "newQuote",
          label: "Bookings",
          link: "/bookings",
          icon: "mdi mdi-calendar-clock",
          parentId: "jobs",
        },
        {
          id: "QuoteRequests",
          label: "Completed Jobs",
          icon: "mdi mdi-briefcase-check",
          link: "/completed-jobs",
          parentId: "jobs",
        },
        {
          id: "AllQuotes",
          label: "Deleted Jobs",
          icon: "mdi mdi-delete-forever",
          link: "/deleted-jobs",
          parentId: "jobs",
        },
        {
          id: "newQuote",
          label: "Callbacks",
          link: "/callbacks",
          icon: "mdi mdi-phone",
          parentId: "jobs",
        },
        {
          id: "newQuote",
          label: "Job Share",
          link: "/job-share",
          icon: "mdi mdi-share-variant",
          parentId: "jobs",
        },
        {
          id: "JobPush",
          label: "Job Push",
          link: "/current-push-jobs",
          icon: "mdi mdi-send",
          parentId: "jobs",
        },
        {
          id: "AllQuotes",
          label: `Partial Quotes`,
          icon: "mdi mdi-format-quote-open",
          link: "/partial-quotes",
          parentId: "jobs",
          badgeName: `${new_visitor.length}`,
          badgeColor: "danger",
        },
        {
          id: "newQuote",
          label: "Job Template",
          link: "/job-template",
          icon: "mdi mdi-briefcase-plus",
          parentId: "jobs",
        },
      ],
    },
    {
      id: "Programming",
      label: "Programming",
      icon: "mdi mdi-map-marker-multiple",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsProgramming(!isProgramming);
        setIscurrentState("Programming");
        updateIconSidebar(e);
      },
      stateVariables: isProgramming,
      subItems: [
        {
          id: "Program",
          label: "New Program",
          link: "/program",
          icon: "mdi mdi-map-marker-plus",
          parentId: "Programming",
        },
        {
          id: "ListofPrograms",
          label: "List of Programs",
          link: "/list-of-program",
          icon: "mdi mdi-bus-stop-uncovered",
          parentId: "Programming",
        },
        {
          id: "Report",
          label: "Contracts",
          link: "/contract",
          icon: "mdi mdi-file-document",
          parentId: "Programming",
        },
        {
          id: "Offers",
          label: "Offers",
          link: "/offers",
          icon: "mdi mdi-bullhorn",
          parentId: "Programming",
        }
      ],
    },
    {
      id: "Administration",
      label: "Finance",
      icon: "mdi mdi-currency-gbp",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsAdministration(!isAdministration);
        setIscurrentState("Administration");
        updateIconSidebar(e);
      },
      stateVariables: isAdministration,
      subItems: [
        {
          id: "Feedback",
          label: "Outstanding",
          link: "/outstanding",
          icon: "mdi mdi-star-half-full",
          parentId: "Reporting",
        },
        {
          id: "Claims",
          label: "Aged Debtors",
          link: "/aged-debtors",
          icon: "mdi mdi-timer-sand",
          parentId: "Reporting",
        },
        {
          id: "Claims",
          label: "Payments",
          link: "/payments",
          icon: "mdi mdi-wallet",
          parentId: "Reporting",
        },
        {
          id: "Claims",
          label: "Dowload Invoices",
          link: "/invoices",
          icon: "mdi mdi-tray-arrow-down",
          parentId: "Reporting",
        },
      ],
    },
    {
      id: "Lists",
      label: "Accounts",
      icon: "mdi mdi-account-cog",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsCorporateTransport(!isCorporateTransport);
        setIscurrentState("CorporateTransport");
        updateIconSidebar(e);
      },
      stateVariables: isCorporateTransport,
      subItems: [
        {
          id: "Schools",
          label: "Schools",
          link: "/schools",
          icon: "mdi mdi-school",
          parentId: "Lists",
        },
        {
          id: "Companies",
          label: "Companies",
          link: "/companies",
          icon: "mdi mdi-domain",
          parentId: "Lists",
        },
        {
          id: "Subcontractors",
          label: "Affiliates",
          link: "/all-sub-contractors",
          icon: "mdi mdi-handshake",
          parentId: "Lists",
        },
        {
          id: "Team",
          label: "Teams",
          link: "/team",
          icon: "ri-team-fill",
          parentId: "Lists",
        },
        {
          id: "Driver",
          label: "Drivers",
          link: "/driver",
          icon: "mdi mdi-account-tie-hat",
          parentId: "Lists",
        },
      ],
    },
    {
      id: "Management",
      label: "Management",
      icon: "mdi mdi-tools",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsFeedbackClaims(!isFeedbackClaims);
        setIscurrentState("Feedback&Claims");
        updateIconSidebar(e);
      },
      stateVariables: isFeedbackClaims,
      subItems: [
        {
          id: "Settings",
          label: "General Settings",
          link: "/site-settings",
          icon: "mdi mdi-cogs",
          parentId: "Management",
        },
        {
          id: "NewVehicle",
          label: "Vehicles",
          link: "/vehicles",
          icon: "mdi mdi-car-side",
          parentId: "Management",
        },
        {
          id: "Emails",
          label: "Emails",
          link: "/email-templates",
          icon: "mdi mdi-email-plus",
          parentId: "Management",
        },
        {
          id: "Defects",
          label: "Defects",
          link: "/defects-management",
          icon: "mdi mdi-alert",
          parentId: "Management",
        },
      ],
    },
    {
      id: "Revelance",
      label: "Relevance",
      icon: "mdi mdi-star-cog",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsRevelance(!isRevelance);
        setIscurrentState("Revelance");
        updateIconSidebar(e);
      },
      stateVariables: isRevelance,
      subItems: [
        {
          id: "Report",
          label: "Report",
          link: "/reporting-management",
          icon: "mdi mdi-chart-bar",
          parentId: "Revelance",
        },
        {
          id: "Feedback",
          label: "Feedback",
          link: "/feedback",
          icon: "mdi mdi-thumb-up",
          parentId: "Revelance",
        },
        {
          id: "Claims",
          label: "Claims",
          link: "/claims",
          icon: "mdi mdi-thumb-down",
          parentId: "Revelance",
        },
      ],
    },
    {
      id: "Help",
      label: "Help",
      icon: "mdi mdi-hand-heart",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsHelp(!isHelp);
        setIscurrentState("Help");
        updateIconSidebar(e);
      },
      stateVariables: isHelp,
      subItems: [
        {
          id: "User Manual",
          label: "User Manual",
          link: "/user-manual",
          icon: "mdi mdi-book-open-page-variant",
          parentId: "Help",
        },
        {
          id: "Request Feature",
          label: "Request Feature",
          link: "/request-feature",
          icon: "mdi mdi-playlist-plus",
          parentId: "Help",
        },
        {
          id: "ReportError",
          label: "Report an Error",
          link: "/report-error",
          icon: "mdi mdi-bug",
          parentId: "Help",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
