/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import { translate } from "@docusaurus/Translate";
import { usePluralForm } from "@docusaurus/theme-common";
import { useDateTimeFormat } from "@docusaurus/theme-common/internal";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import styles from "./styles.module.css";

function ReadingTime({ readingTime }) {
  const { selectMessage } = usePluralForm();
  const minutes = Math.ceil(readingTime);
  return selectMessage(
    minutes,
    translate(
      {
        id: "theme.blog.post.readingTime.plurals",
        description:
          'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
        message: "One min read|{readingTime} min read",
      },
      { readingTime: minutes }
    )
  );
}

export default function BlogPostItemHeaderInfo({ className }) {
  const { metadata } = useBlogPost();
  const { date, readingTime } = metadata;
  const dateTimeFormat = useDateTimeFormat({
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className={clsx(styles.container, "margin-vert--md", className)}>
      <time dateTime={date}>{dateTimeFormat.format(new Date(date))}</time>
      {" | "}
      <span className={styles.author}>Alexander Wang</span>
      {typeof readingTime !== "undefined" && (
        <>
          {" · "}
          <ReadingTime readingTime={readingTime} />
        </>
      )}
    </div>
  );
}
