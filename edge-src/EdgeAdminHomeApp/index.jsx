import React from 'react';
import AdminWholeHtml from "../components/AdminWholeHtml";
import {NAV_ITEMS, NAV_ITEMS_DICT, OUR_BRAND} from "../../common-src/Constants";
import {escapeHtml} from "../../common-src/StringUtils";

export default class EdgeAdminHomeApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {feedContent, onboardingResult} = this.props;
    return (
      <AdminWholeHtml
        title={`${NAV_ITEMS_DICT[NAV_ITEMS.ADMIN_HOME].name} | ${OUR_BRAND.domain}`}
        description="phat nguoi,phạt nguội, phat nguoi giao thong, phạt nguội giao thông, tra phat nguoi, tra phạt nguội, kiem tra phat nguoi, kiểm tra phạt nguội, tin tức giao thông, tin tức phạt nguội giao thông"
        webpackJsList={['admin_home_js']}
        webpackCssList={['admin_styles_css']}
        feedContent={feedContent}
        onboardingResult={onboardingResult}
      />
    );
  }
}
