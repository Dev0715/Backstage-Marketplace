/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 10.4.20-MariaDB : Database - nft_market
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nft_market` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `nft_market`;

/*Table structure for table `addon_icons` */

DROP TABLE IF EXISTS `addon_icons`;

CREATE TABLE `addon_icons` (
  `src` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `addon_icons` */

insert  into `addon_icons`(`src`,`id`,`deletedAt`,`createdAt`,`updatedAt`) values 
('/img/avatars/avatar2.jpg','1',NULL,'2022-04-07 01:22:22.679195','2022-04-07 01:22:22.779603'),
('/img/avatars/avatar.jpg','2',NULL,'2022-04-07 01:22:22.679195','2022-04-07 01:22:22.779603'),
('/img/avatars/avatar3.jpg','3',NULL,'2022-04-07 01:22:22.679195','2022-04-07 01:22:22.779603'),
('/img/avatars/avatar4.jpg','4',NULL,'2022-04-07 01:22:22.679195','2022-04-07 01:22:22.779603'),
('/img/avatars/avatar5.jpg','5',NULL,'2022-04-07 01:22:22.679195','2022-04-07 01:22:22.779603'),
('/img/avatars/avatar6.jpg','6',NULL,'2022-04-07 01:33:14.559011','2022-04-07 01:33:14.559011'),
('/img/avatars/avatar7.jpg','7',NULL,'2022-04-07 01:33:16.895335','2022-04-07 01:33:22.961934'),
('/img/avatars/avatar8.jpg','8',NULL,'2022-04-07 01:33:29.848650','2022-04-07 01:33:29.848650');

/*Table structure for table `articles` */

DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `articles` */

insert  into `articles`(`id`,`deletedAt`,`createdAt`,`updatedAt`,`title`,`image`,`description`) values 
('0b6d4d44-c579-46f9-9fcf-c212a3e60377',NULL,'2022-01-09 22:36:29.096480','2022-01-09 22:36:29.096480','Backstage — The Utilities you cannot Afford to Loose','assets/uploads/article/WDbXtiLllSmmlCaC.jpg','<h1><strong>Bit of a Backstory:</strong></h1>\n<p>From the dawn of the internet, humanity has evolved at an exponential rate in practically every aspect of society, commencing an era of technology. The inception of <a href=\"https://bksbackstage.io/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>decentralized blockchain technology</u></a> has given birth to several other supporting pillars like NFTs, Cryptocurrencies benchmarking themselves in the historical chapters.</p>\n<p><strong>Market Explosion:</strong></p>\n<p>According to the stats of CoinMarketCap, the total market cap of all cryptocurrencies is nearly $1.90 trillion. It has been observed that events such as music concerts, sports, exhibitions &amp; conferences, seminars, and others attract a large number of young people. This continuously expanding of industrial entertainment parameters conjugate the promoters and companies to line up for collaborations as music concerts and other events result in a win-win situation for everyone.</p>\n<p><strong>Backstage — A Groundbreaking Crypto Project:</strong></p>\n<p>Leveraging the Binance Smart chain to set the sail towards engraving the name “Backstage” via the launch of their own BEP-20 token “$BKS” to disjoint every crippling problem faced at each public congregation.</p>\n<p>Backstage will never be ready more than right now to delve deeply into the public event mechanisms and grease the smooth flow of transactions related to:</p>\n<ol>\n  <li>Secure payment at festivals, public gatherings, Music Concerts, Ted-X, Ted Talks, Movie Premieres, Met Galas, Conventions, Youtube Fest, Anime Fests, Any Networking Events, and list for practical use goes on and on and on.</li>\n  <li>Any event becomes a disaster when the ordered products do not reach the consumer’s table. Backstage will be totally responsible for initiating the supply-chain demand. We will bring the fresh supply of products directly from the production house to the customer’s plate.</li>\n  <li>Backstage will ensure that the utilizers do not have to worry about the authenticity and integrity of the ordered products and goods as we are utilizing the magnanimous prowess of Binance Smart Chain to authenticate the sales as well as P&amp;L certifications to avoid theft and counterfeit.</li>\n  <li>How often does the payment between the vendors or from the organization to a vendor or from the inaugural party to planners got stuck during the processing due to late hours resulting in frustrating heads? Instituting Backstage in your event, you will never have to face such mind-boggling facades regarding money transfer due to BSC’s 30 transactions per second lightning speed along with additional no international fee charges.</li>\n</ol>\n<h1><strong>Conclusion:</strong></h1>\n<p>In a nutshell, $BKS is one of the most active projects in the blockchain space, leveraging the idea through high-quality services. The fantastic news is that the project’s ICO sale is just around the corner. Once the sale begins, you may start acquiring $BKS tokens to enjoy a frictionless experience at any of the upcoming events across the world.</p>\n<p><strong>To learn more, go to</strong> <a href=\"https://bksbackstage.io/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>https://bksbackstage.io/.</u></a></p>\n<p><br></p>'),
('2a534b75-4e33-4f3c-ab66-c0ccb77e6ef9',NULL,'2022-01-09 22:39:23.231214','2022-01-09 22:39:23.231214','Backstage Monthly Recap — Review for November','assets/uploads/article/zBLcThIdtpQeIEdd.jpg','<p>November has been a big month for <a href=\"https://bksbackstage.io/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>Backstage</u></a>. We’ve hashed out numerous sponsorship deals and hit roadmap milestones.</p>\n<p>There’s much to celebrate and lots more hard work ahead. We’re excited for all that’s to come, and we’re truly grateful for all the support from Backstage community members, industry entrepreneurs, artists, musicians and others. We’re proud to have the opportunity to build a world-class blockchain ecosystem for the events industry.</p>\n<p>This month has had numerous key developments. Most notably, Backstage served as the official sponsor of the <a href=\"https://en.wikipedia.org/wiki/Danish_Music_Awards\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>Danish Music Awards</u></a>. Check out some footage below.</p>\n<p>On November 20th, the world bore witness to the 2021 Danish Music Awards, and while it was still the premier showcase of Danish music talent that we’ve come to expect from it, something was different this year. Backstage was made the official sponsor of 2021’s DMAs, heralding a new era for event festivals and the blockchain.</p>\n<p>Backstage’s partnership with the Danish Music Awards was a mutually beneficial arrangement that allowed us to reach a wider international audience. By spreading word about how Backstage can revolutionize the events industry through an event, it helps lend legitimacy to what Backstage is trying to accomplish.</p>\n<p><br></p>'),
('2c59e30a-c7a5-49e7-b8b2-7306614b648a',NULL,'2022-01-09 22:36:58.509107','2022-01-09 22:36:58.509107','Backstage — A Decentral Solution to all your Event Planning','assets/uploads/article/ZOEbowrfvddendDy.jpg','<h1><strong>Big Bang Blockchain:</strong></h1>\n<p>Adhering from the principles of the whitepaper published by the pseudonym “ Satoshi Nakamoto” on the non-interference of intermediary and peer-to-peer transactions, birthed the idea of a digital ledger to record transactions by socializing the decentralized networks to perform transactions without middlemen, known as the blockchain.</p>\n<h1><strong>Backstage, An Inception</strong></h1>\n<p>Backstage is a blockchain project conceptualized to minimize the problems handled by the event organizing parties in a decentral way such as payment delays or failures, supply-chain management, stocking all of this via the launch of their own cryptocoin “ BKS.” Backstage is also delving deep into the decentral universe by introducing an NFT marketplace to help the artists, craftspersons, and other inventors to claim the ownership of their magnum opus by tokenizing their assets on the blockchain.</p>\n<h1><strong>Why Backstage?</strong></h1>\n<p>The following few pointers will clarify the need for the projects like Backstage in the market.</p>\n<ol>\n  <li>The prime focus of the organizing committee revolves around the successful execution of the event and no one until now can provide fully-fledged security as well as transparency to the core transaction regarding the payments involved.</li>\n  <li>Involvement of central authority of the financial governing bodies in the payment of the service providers in an event is less likely to be accomplished in time due to the involvement of fiat money, which can take a lot of time to reflect in the bank accounts.</li>\n  <li>Due to the privatization in the digital era, the greatest threat is to privacy, see the irony. The principles of the blockchain assign the prime importance to privacy only via the anonymity of the user. In organized events, most of the time the sensitive information regarding participants is stored with the event organizers.</li>\n</ol>\n<h1><strong>Backstage Future-proofing:</strong></h1>\n<p>Opting Backstage will definitely bring the most awaited revolution in the event organizing industry. Accepting the blockchain wholeheartedly to perform the B2P transactions regarding any event will reward the participants in creating an innovative way to establish complete financial solutions.</p>\n<p>To complete the blockchain circle and fire the chain reaction to instill trust and confidence in the Backstage, they are launching their own token BKS which will provide the DeFi features like Staking which will, in turn, bring up the liquidity on the exchanges. Funds gathered from the BKS will be used to finance the events and festivals organized by Backstage all around the world.</p>\n<h1><strong>In a Nutshell:</strong></h1>\n<p>To conclude, Backstage will be performing as the backbone in the event industry supporting the processing of the funds, checking on any types of delays in management, performing peer-to-peer as well as business-to-peer transactions all while conserving the privacy of the participants by leveraging blockchain technology.</p>\n<p><strong>For More information, Visit</strong> <a href=\"https://bksbackstage.io/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>https://bksbackstage.io/</u></a></p>'),
('53a4aa1d-c225-4b6f-996e-7b21c3fbbd0d',NULL,'2022-01-09 22:40:54.365330','2022-01-09 22:40:54.365330','The COVID-19 Pandemic Has Damaged the Events Industry. But Opportunities Arise from the Darkest Moments','assets/uploads/article/YcWSdmwyhBBLSMcA.jpg','<p>There’s no denying the pandemic has wreaked havoc on the events industry — whether it be concert venues, conference centers, or sports arenas.</p>\n<p>In fact, <a href=\"https://www.jwu.edu/news/2021/04/the-future-of-events-industry.html\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>96% of live event professionals</u></a> have reported cancelling events due to the COVID-19 pandemic. A large portion even believe the pandemic will continue to negatively impact their business for years to come.</p>\n<p>Indeed, COVID-19 has impacted almost all aspects of life. Yet even in a crisis, opportunity arises. In our personal lives, the pandemic may have motivated us to rethink what we want out of our lives, and to live more intently. It may have helped you make a career change you’ve always wanted, or go back to school.</p>\n<p>Within the events industry, the pandemic has presented a similar opportunity. We now have an opportunity to rebuild the events ecosystem so that it drives innovations, distributes value fairly, protects content creators appropriately, and ensures everything from financing to ticketing is efficient.</p>\n<p>This is why we created <a href=\"https://bksbackstage.io/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>Backstage</u></a> — <em>the crypto revolution in the event industry</em>. We aim to solve the challenges in the events industry with our blockchain ecosystem and fluid cryptocurrency.</p>\n<p>Impact of Covid on the events industry</p>\n<p>COVID-19 has had a deep impact on global events across different sectors, such as culture, trade, and sports. In 2020, the pandemic did the most economic damage, causing <a href=\"https://www.statista.com/topics/6139/covid-19-impact-on-the-global-economy/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>the world economy to shrink by 3.4%</u></a> (or $2.87 trillion less in economic output).</p>\n<p>Yet the most impacted sector has been the events and entertainment industries. The virus has especially impacted event owners, entrepreneurs and organizers, as well as performers and attendees. The restrictions imposed due to the pandemic have also impacted private events, like weddings, exhibitions, conferences and so on.</p>\n<p>The pandemic continues, and we hope everyone is staying safe and healthy. The good news is we are returning to a new normal. People are once again attending shows, concerts, plays, sports games and more.</p>\n<p>For us at Backstage, this presents a significant opportunity.</p>\n<p>First, the events industry remains large — with plenty of room for growth post-pandemic. According to <a href=\"https://bksbackstage.io/img/Backstage-whitepaper.pdf\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>research</u></a>, the event industry size was $1.135 trillion in 2019 and was expected to reach $1.553 trillion by 2028, a compound growth rate of 11.2%.</p>\n<blockquote><em>Note that events include conferences and exhibitions, corporate events and seminars, promotions and fundraisers, music and art performances, sports competitions, festivals, trade shows, and product launches.</em></blockquote>\n<p>A current issue is the lack of a unified ecosystem. Therefore, a solution like Backstage, which brings event finance, payments, intellectual property, ticketing and more onto the blockchain, has tremendous potential.</p>\n<p>Second, after any recession, there’s the opportunity to build anew. Previously, the events industry had allowed too much control to large corporations, like Ticketmaster (darn those Ticketmaster fees!).</p>\n<p>We need a solution that takes the industry towards a better future. Backstage can <a href=\"https://bksbackstage.io/#solution\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>solve long-standing issues</u></a> with the events industry, like ticketing fees and financing sources. With the generation of <strong>BKS tokens, Backstage</strong> founders will provide the event industry with technologies devoted to financing and digitizing the industry.</p>\n<p>We’re happy to see that the events industry seems ready for a crypto solution. <a href=\"https://bksbackstageofficial.medium.com/crypto-com-arena-the-arrival-of-crypto-to-sports-what-this-means-for-backstage-1eee4351251d\" rel=\"noopener\"><u>See our post on the arrival of crypto to sports</u></a>.</p>'),
('755146dc-72a3-40bf-b5b5-5706ffb1a22a',NULL,'2022-05-10 11:23:09.246627','2022-05-10 11:23:09.246627','Crypto Example','assets/uploads/article/SHzuJgwuEtzaRRaw.jpg','<p>sadfsdafdsaf</p>\r\n<p>fsdaf</p>\r\n<p>dsaf</p>\r\n<p><br></p>\r\n<p>dsaf</p>\r\n<p>sd</p>\r\n<p>af</p>\r\n<p>dsa</p>\r\n<p>fdsaf</p>'),
('cd797fce-d9ac-4a0d-ac06-5e926beecb65',NULL,'2022-01-09 22:41:54.103886','2022-01-09 22:41:54.103886','Is the Metaverse the Next Big Thing in the Event Industry?','assets/uploads/article/IcvTkUhkrnLcMary.jpg','<p>The metaverse has been a hot topic recently, largely due to <a href=\"https://www.cnbc.com/2021/10/28/facebook-changes-company-name-to-meta.html\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>Facebook changing its name to Meta</u></a> and announcing a new focus on the metaverse itself. However, the metaverse can change more than just how we approach social media, though that’s an obvious facet of online interaction that it can alter.</p>\n<p>The metaverse can entirely change how we approach events, including how those events are hosted, something which may be required in the post-pandemic world.</p>\n<ul>\n  <li>Read our article on <a href=\"https://bksbackstageofficial.medium.com/the-covid-19-pandemic-has-damaged-the-events-industry-3177a26ae220\" rel=\"noopener\"><u>how Backstage can rebuild the events industry</u></a> after the COVID-19 pandemic.</li>\n</ul>\n<p>Now, let’s take a look at exactly what the proliferation of the metaverse means for the event industry. We’ll start by discussing what the metaverse is in the first place.</p>\n<h1><strong>What Is the Metaverse?</strong></h1>\n<p>There are two kinds of people: those who will tell you that the metaverse will forever change human interaction and those that say that it will crash and burn before ever getting off the ground. As usual, the answer lies somewhere in the middle, and we’ll only have a clear picture once it sufficiently develops.</p>\n<p>The <a href=\"https://arstechnica.com/gaming/2021/11/everyone-pitching-the-metaverse-has-a-different-idea-of-what-it-is/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>metaverse</u></a> is designed to be a virtual space that exists parallel to our world, much like the internet already does. So why don’t we call the metaverse the internet? It’s largely due to the differences in how people are expected to interact with the metaverse compared to how they already do with the web.</p>\n<p>Up until now, using the web has been a relatively detached experience, since you’re doing what you do through a screen. Though certain parts of the web like online gaming can feel pretty immersive, other things like forums, message boards, and video meetings have still felt different from daily life.</p>\n<p>With the rise of virtual reality and platforms like <a href=\"https://hello.vrchat.com/\" rel=\"noopener ugc nofollow\" target=\"_blank\"><u>VRChat</u></a>, we’ve seen the beginnings of the metaverse. The metaverse is essentially a union between the web and VR (as well as AR). This creates a virtual world that we can interact with much like its our own without having to feel like it’s too distinct.</p>'),
('fe490c99-1ac1-4b0a-9ce9-f6e320e2f20a',NULL,'2022-05-10 11:39:52.693941','2022-05-10 11:39:52.693941','Title','assets/uploads/article/lOpLXjFPCCLcOCbj.jpg','Description');

/*Table structure for table `collections` */

DROP TABLE IF EXISTS `collections`;

CREATE TABLE `collections` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `picture_large` varchar(255) DEFAULT NULL,
  `picture_small` varchar(255) DEFAULT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `wallet_address` varchar(255) NOT NULL,
  `picture_ipfs` varchar(255) DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_64f0aa1d5b42a7f617724e9cbe9` (`creatorId`),
  CONSTRAINT `FK_64f0aa1d5b42a7f617724e9cbe9` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `collections` */

insert  into `collections`(`id`,`name`,`category`,`picture_large`,`picture_small`,`creatorId`,`deletedAt`,`createdAt`,`updatedAt`,`wallet_address`,`picture_ipfs`,`deleted`) values 
('08dcd3de-38f3-4253-8dc1-8fef43dcb91b','123456','456789','assets/uploads/eventcards/WrYYHElJHhljViVg.jpg','assets/uploads/eventcards/lptAszhxeYCmHRQS.jpg','a66f1f57-4065-4f0c-8dd3-7d9b338b557a',NULL,'2022-04-04 15:13:31.096682','2022-04-04 15:13:31.096682','0x41f532bed9df43eb4895c4ddc9a756ed568e761d','https://ipfs.infura.io/ipfs/QmYYAvnLWfbyzSLRjWBsnTTWJno19Gr2T1fqqeZkv1V39u',0),
('27c04e25-da2f-456d-b3ab-5dac1f29aa7f','Daniel Jin','12313','assets/uploads/eventcards/OflNQAbvdSPWWfsQ.jpg','assets/uploads/eventcards/MkDPyrUVgMjAOjqI.jpg','a66f1f57-4065-4f0c-8dd3-7d9b338b557a',NULL,'2022-05-10 11:49:10.741630','2022-05-10 11:49:10.741630','0x7F47ab4BD1A63EeCEEFf1F3A268B7AAF39Ca893e','https://ipfs.infura.io/ipfs/QmTLcpAtaaUuXE9KG1oau1xz2LvBV4eejsVqwqh8bwnZB3',0),
('8c3b1017-3180-4cd8-b9d0-8d8a8b74a8ae','Mono Dev','456789','assets/uploads/eventcards/iGyCbSPNeKVsuASV.jpg','assets/uploads/eventcards/WOrwjVXOyKXYbWWk.jpg','a66f1f57-4065-4f0c-8dd3-7d9b338b557a',NULL,'2022-04-02 00:00:40.777487','2022-04-04 12:44:19.295983','0xea1b88c99cea20b440462c42dba9ff0402ec6b41','https://ipfs.infura.io/ipfs/QmQyakWxDvoxwKhxga1KLdzc1Xvcigcr6Q2nKMcNJdeQNK',0),
('d7ac9574-00e8-4f71-9b92-5adc65a71f94','Name','Category','assets/uploads/eventcards/tucCujmClrMwRGNE.jpg','assets/uploads/eventcards/DbKOYeXxmUyiSQYj.jpg','a66f1f57-4065-4f0c-8dd3-7d9b338b557a',NULL,'2022-05-10 12:24:51.576782','2022-05-10 12:24:51.576782','0x7F47ab4BD1A63EeCEEFf1F3A268B7AAF39Ca893e','https://ipfs.infura.io/ipfs/QmTLcpAtaaUuXE9KG1oau1xz2LvBV4eejsVqwqh8bwnZB3',0);

/*Table structure for table `event_cards` */

DROP TABLE IF EXISTS `event_cards`;

CREATE TABLE `event_cards` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `likes_number` int(11) DEFAULT NULL,
  `background` varchar(255) DEFAULT NULL,
  `picture_large` varchar(255) DEFAULT NULL,
  `picture_small` varchar(255) DEFAULT NULL,
  `picture_ipfs` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `tiktok` varchar(255) DEFAULT NULL,
  `telegram` varchar(255) DEFAULT NULL,
  `discord` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `collection` varchar(255) NOT NULL,
  `green_pass_needed` tinyint(4) NOT NULL,
  `total_tickets` int(11) DEFAULT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  `venue_description` text NOT NULL,
  `description` text NOT NULL,
  `buy_count` int(11) NOT NULL DEFAULT 0,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `addons` varchar(1023) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_8441947bd3148a2161aa9cd2dbb` (`creatorId`),
  CONSTRAINT `FK_8441947bd3148a2161aa9cd2dbb` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `event_cards` */

insert  into `event_cards`(`id`,`deletedAt`,`createdAt`,`updatedAt`,`name`,`location`,`date`,`likes_number`,`background`,`picture_large`,`picture_small`,`picture_ipfs`,`price`,`facebook`,`twitter`,`instagram`,`tiktok`,`telegram`,`discord`,`tags`,`category`,`collection`,`green_pass_needed`,`total_tickets`,`creatorId`,`venue_description`,`description`,`buy_count`,`deleted`,`addons`) values 
('6898ce70-e257-4fe3-a8e5-8fab296ec02e',NULL,'2022-04-07 11:13:56.659127','2022-05-21 02:45:06.336172','asfsdf','Singapore','2022-04-01T02:11:00.000Z',NULL,NULL,'assets/uploads/eventcards/arucwkDnEEvRmimK.jpg','assets/uploads/eventcards/yAiKNmqYFQvzZmrM.jpg','https://ipfs.infura.io/ipfs/QmV8YxmA21nGqPf7UAPsAZYwRkZsKbim8brY2apNizboYT',10,'sadf','sdf','sdaf','sdf','sadf','sdf','','Category2','8c3b1017-3180-4cd8-b9d0-8d8a8b74a8ae',1,50,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sdaf','sadfsadf',0,0,''),
('75abcc3d-af32-4aec-a435-3f5df06ea852',NULL,'2022-04-04 18:08:10.361948','2022-05-21 02:45:07.136737','Jack Jin','Singapore','2022-04-13T09:07:00.000Z',NULL,NULL,'assets/uploads/eventcards/zaBjbZQetQvFHiNO.jpg','assets/uploads/eventcards/ifMtsaDKQIYZzJeh.jpg','https://ipfs.infura.io/ipfs/QmTjXJ92wAdEyrYLxgH9WE96nhnSUvg6JJVBdi9ABSfKnS',10,'sdf','sdf','fsdf','d','df','df','','Category2','08dcd3de-38f3-4253-8dc1-8fef43dcb91b',0,50,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','asdf','saf',0,0,''),
('7a282e16-a8e6-4adc-a365-050ade563ab4',NULL,'2022-04-01 22:15:36.445035','2022-05-21 02:45:07.459888','adsf','sadf','2022-04-12T13:15:00.000Z',NULL,NULL,'assets/uploads/eventcards/IxtumerAgNVXsAQM.jpg','assets/uploads/eventcards/ruKyoAyStwMaDrZp.jpg','https://ipfs.infura.io/ipfs/QmZZY2gNLNZirnfA7yVSeu3YTNQoKjTBZKuLERGjnhYM8u',10,'sadf','d','sdaf','d','asdf','as','','Category1','08dcd3de-38f3-4253-8dc1-8fef43dcb91b',0,0,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','asdf','adf',0,0,''),
('8b870178-b0ad-4e6d-9eb9-86b8eb552ff5',NULL,'2022-05-10 12:40:01.457392','2022-05-21 02:45:07.721587','name','location','2022-05-12T03:34:00.000Z',NULL,NULL,'assets/uploads/eventcards/evVliCbgBQqbzwJZ.jpg','assets/uploads/eventcards/KZBDUTXhUiTFRncg.jpg','https://ipfs.infura.io/ipfs/QmNmjKotNRWb7RKefGJUaGPapQEDZ22M4znjZB8AY42iQ5',10,'sadf','sdaf','sdaf','sadf','sadf','asdf','','Category1','27c04e25-da2f-456d-b3ab-5dac1f29aa7f',1,0,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sadf','sasafdsf',0,0,'[{\"name\":\"safdsf\",\"description\":\"sadf\",\"price\":\"sdaf\",\"icon\":\"/img/avatars/avatar5.jpg\"},{\"name\":\"sdf\",\"description\":\"sadfsaf\",\"price\":\"sadfsdaf\",\"icon\":\"/img/avatars/avatar4.jpg\"}]'),
('a389325f-e78e-4188-a073-a79c2d893cc7',NULL,'2022-03-16 13:26:10.123531','2022-05-21 02:45:07.939641','4564','Singapore','2022-03-02T04:25:00.000Z',NULL,NULL,'assets/uploads/eventcards/KmRUjKqCoItzoqJL.jpg','assets/uploads/eventcards/YVYMiVbOMezOXGLP.jpg','https://ipfs.infura.io/ipfs/QmNTq8MyazAShHdHssjoEUyZqe3yPkNwHP22gbDYC6DUBr',10,'sdf','asdf','fsdf','sdaf','df','as','','Category2','8c3b1017-3180-4cd8-b9d0-8d8a8b74a8ae',1,12,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','45','45',0,0,''),
('bed030ce-5d35-4c72-b0c1-f8c0a49435c2',NULL,'2022-05-10 12:34:49.242354','2022-05-21 02:45:08.250395','sadf','sf','2022-05-12T03:34:00.000Z',NULL,NULL,'assets/uploads/eventcards/OghHAfsMuTAnEdZO.jpg','assets/uploads/eventcards/dxVatSIHRcvqTadw.jpg','https://ipfs.infura.io/ipfs/QmNmjKotNRWb7RKefGJUaGPapQEDZ22M4znjZB8AY42iQ5',10,'sadf','sdaf','sdaf','sadf','sadf','asdf','','Category1','27c04e25-da2f-456d-b3ab-5dac1f29aa7f',1,0,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sadf','sasafdsf',0,0,'[{\"name\":\"safdsf\",\"description\":\"sadf\",\"price\":\"sdaf\",\"icon\":\"/img/avatars/avatar5.jpg\"},{\"name\":\"sdf\",\"description\":\"sadfsaf\",\"price\":\"sadfsdaf\",\"icon\":\"/img/avatars/avatar4.jpg\"}]'),
('c9db21f3-c431-42c1-9aa8-46065f1a1bb5',NULL,'2022-03-24 16:53:08.545441','2022-05-21 02:45:08.656977','Mono Dev','sadf','2022-03-21T07:52:00.000Z',NULL,NULL,'assets/uploads/eventcards/izOyEMuwMUFGfuCl.jpg','assets/uploads/eventcards/VngIRhMzpvsPVBIw.jpg','https://ipfs.infura.io/ipfs/QmRpNYEEHrUYVLP2s2mBdqH7Mj1f2cwNefHctwvoKX6bKF',10,'sadf','sdf','df','sdaf','asdf','as','','Category1','08dcd3de-38f3-4253-8dc1-8fef43dcb91b',0,60,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sadf','sadfsdaf',0,0,''),
('ca649a78-1a75-4606-9227-2db3cd13c880',NULL,'2022-04-08 12:35:02.968211','2022-05-21 03:05:59.000000','asdf','sdaf','2022-03-30T03:34:00.000Z',NULL,NULL,'assets/uploads/eventcards/EqKjMkpFCNrchscJ.jpg','assets/uploads/eventcards/FyoLGmWmxUniyanP.jpg','https://ipfs.infura.io/ipfs/QmPsJ7faC4kSYMqtZhgkkangSA1wYBJ9V2idXLUAXm8d7z',10,'sdf','df','df','df','df','df','','Category2','08dcd3de-38f3-4253-8dc1-8fef43dcb91b',1,10,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sdaf','sadf',9,0,'[{\"name\":\"a\",\"description\":\"b\",\"price\":\"10\",\"icon\":\"/img/avatars/avatar6.jpg\"},{\"name\":\"d\",\"description\":\"e\",\"price\":\"10\",\"icon\":\"/img/avatars/avatar5.jpg\"}]'),
('cc0bf77d-1605-418e-bfbb-e2c9228800ac',NULL,'2022-04-08 10:13:18.318675','2022-05-21 02:45:09.381193','abc','abc','2022-04-11T01:10:00.000Z',NULL,NULL,'assets/uploads/eventcards/YJSiXqpXoGhRRdjn.jpg','assets/uploads/eventcards/oPwhzNLUbTmrceNA.jpg','https://ipfs.infura.io/ipfs/QmZB6FYCWo5kzhfXiszhE16YmPAF3QzHfAGyizGFNfFuu2',10,'sdf','asdf','df','df','saf','d','','Category2','8c3b1017-3180-4cd8-b9d0-8d8a8b74a8ae',0,12,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sadf','sdafsdaf',0,0,''),
('d68f7fc5-b75c-437b-ada4-83c55fbdde4f',NULL,'2022-04-08 10:22:43.587374','2022-05-21 02:45:11.795230','qwer','sadf','2022-04-08T01:21:00.000Z',NULL,NULL,'assets/uploads/eventcards/hcOGNyJzpLOPbMNt.jpg','assets/uploads/eventcards/dIPnVFEpPBtYfVjZ.jpg','https://ipfs.infura.io/ipfs/QmPsJ7faC4kSYMqtZhgkkangSA1wYBJ9V2idXLUAXm8d7z',10,'sadf','asdf','df','sdaf','sadf','dsf','','Category2','08dcd3de-38f3-4253-8dc1-8fef43dcb91b',1,50,'a66f1f57-4065-4f0c-8dd3-7d9b338b557a','sadfsdaf','sdafsdaf',0,0,'[{\"name\":\"d\",\"description\":\"e\",\"price\":\"4\",\"icon\":\"/img/avatars/avatar6.jpg\"},{\"name\":\"a\",\"description\":\"b\",\"price\":\"1\",\"icon\":\"/img/avatars/avatar5.jpg\"},{\"name\":\"d\",\"description\":\"d\",\"price\":\"5\",\"icon\":\"/img/avatars/avatar3.jpg\"},{\"name\":\"df\",\"description\":\"df\",\"price\":\"58\",\"icon\":\"/img/avatars/avatar.jpg\"}]');

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `table` varchar(255) NOT NULL,
  `events` varchar(255) NOT NULL,
  `concert` varchar(255) NOT NULL,
  `merchandising` varchar(255) NOT NULL,
  `collections` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL,
  `tipology` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `venue_table` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `events` */

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `receiver` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_cb1198160fa8652a25c293bc25f` (`creatorId`),
  CONSTRAINT `FK_cb1198160fa8652a25c293bc25f` FOREIGN KEY (`creatorId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `messages` */

insert  into `messages`(`id`,`deletedAt`,`createdAt`,`updatedAt`,`receiver`,`link`,`content`,`creatorId`) values 
('00003c6f-4ea9-4dc7-bf1b-d4867ce26fc0',NULL,'2022-01-08 23:54:11.508048','2022-05-10 16:29:19.376201','fedman78@gmail.com','test','<p>test</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('03add28e-23b8-4f62-bfef-391b00fedc0a',NULL,'2022-05-10 16:23:12.393225','2022-05-10 16:29:19.803409','john@gmail.com','sadf','<p>sdfsafsdafsdaf</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('03b577c2-6371-42eb-a64f-722ebc4ac302',NULL,'2022-01-05 01:11:46.680897','2022-05-10 16:29:20.082311','maufaxe@gmail.com','https://www.featured.market/nft/0x2d956093d27621ec0c4628b77eaeac6c734da02c/27712','<p>Ciao Mauricio,</p>\n<p>Ho create il primo (?) NFT del logo di backstage. Ho pagato 0.89 dollari per fare il mint e ho pagato 0.40 per poterlo vendere su Binance NFT market place.</p>\n<p>Fed</p>\n<p><br></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('0a6d5901-e7e9-4a62-b528-7654c654a853',NULL,'2022-01-04 20:58:33.296518','2022-05-10 16:29:20.342834','fedman78@gmail.com','http://ec2-3-144-25-242.us-east-2.compute.amazonaws.com/','<p>Please find the QR code and link attached</p>\n<p><br></p>\n<p><a href=\"www.bkscackstage.io\"><em><strong>BACKSTAGE</strong></em></a></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('296eb6b9-0ca2-4a52-bb48-c8c02c0c33bb',NULL,'2022-05-10 16:18:03.435700','2022-05-10 16:29:20.604833','john@gmail.com','sadf','<p>sdfsafsdafsdaf</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('361129f6-24bc-4c73-a307-b306cbf915da',NULL,'2022-01-05 01:15:37.403807','2022-05-10 16:29:21.157897','fedubs78@gmail.com','https://www.featured.market/nft/0x2d956093d27621ec0c4628b77eaeac6c734da02c/27712','<p>Ciao Mauricio,</p>\n<p>Ho create il primo (?) NFT del logo di backstage. Ho pagato 0.89 dollari per fare il mint e ho pagato 0.40 per poterlo vendere su Binance NFT market place.</p>\n<p>Fed</p>\n<p><br></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('41b971b9-5eee-4b62-a880-210f645cd1c1',NULL,'2022-05-10 16:29:05.772817','2022-05-10 16:29:05.772817','john@gmail.com','sadf','<p>sdfsafsdafsdaf</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('5b2f91af-19ca-42d6-8ee8-cff6e78c3a33',NULL,'2022-01-05 01:22:33.922561','2022-05-10 16:29:21.902035','fedubs78@gmail.com','https://www.featured.market/nft/0x2d956093d27621ec0c4628b77eaeac6c734da02c/27712','<p>Ciao Mauricio,</p>\n<p>Ho create il primo (?) NFT del logo di backstage. Ho pagato 0.89 dollari per fare il mint e ho pagato 0.40 per poterlo vendere su Binance NFT market place.</p>\n<p>Fed</p>\n<p><br></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('86f651f3-69ab-4f80-b793-412593b9736e',NULL,'2022-01-07 02:39:45.841705','2022-05-10 16:29:22.310001','kssalexander323@gmail.com','https://localhost:3000','<p>asdfasdf</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('891ad8a1-b7f4-401b-9e0b-f71853dc8cf2',NULL,'2022-01-04 21:06:00.461493','2022-05-10 16:29:22.802900','maufaxe@gmail.com','https://testnet.bscscan.com/address/0xbF2c98400e5F2Ba1F8952487d3430197b0C4d3Fa#code','<p>Please find the QR code and link attached</p>\n<p><em><strong>Thanks </strong></em><a href=\"www.bkscackstage.io\"><em><strong>BACKSTAGE</strong></em></a></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('8bd36b28-f4d6-4373-a9e0-89098cd575ee',NULL,'2022-01-05 01:23:28.112261','2022-05-10 16:29:23.180864','fedubs78@gmail.com','https://www.featured.market/nft/0x2d956093d27621ec0c4628b77eaeac6c734da02c/27712','<p>Ciao Mauricio,</p>\n<p>Ho create il primo (?) NFT del logo di backstage. Ho pagato 0.89 dollari per fare il mint e ho pagato 0.40 per poterlo vendere su Binance NFT market place.</p>\n<p>Fed</p>\n<p><br></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('ad9af074-ffab-4594-aa17-262a2a29ecbc',NULL,'2022-01-04 21:14:06.149873','2022-05-10 16:29:23.517715','maufaxe@gmail.com','https://testnet.bscscan.com/address/0xbF2c98400e5F2Ba1F8952487d3430197b0C4d3Fa#code','<p>Please find the QR code and link attached</p>\n<p><em><strong>Thanks </strong></em><a href=\"www.bkscackstage.io\"><em><strong>BACKSTAGE</strong></em></a></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('bdb8f5b3-d54e-44d4-b21e-d36ff2e29cbd',NULL,'2022-05-10 16:17:41.782548','2022-05-10 16:29:24.054216','john@gmail.com','safsdf','<p>sfsdfsdafdsf</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('bf51d0aa-3db7-486d-96b4-2c5b42692cb5',NULL,'2022-01-04 05:02:36.070260','2022-05-10 16:29:24.859303','kssalexander323@gmail.com','http://ec2-3-144-25-242.us-east-2.compute.amazonaws.com/','<h1>Hi, this is test for sever</h1>\n<p>I am with you here</p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a'),
('da913c84-0b12-47aa-9a65-a6051046e0f4',NULL,'2022-01-05 01:12:55.861431','2022-05-10 16:29:28.120418','fedubs78@gmail.com','https://www.featured.market/nft/0x2d956093d27621ec0c4628b77eaeac6c734da02c/27712','<p>Ciao Mauricio,</p>\n<p>Ho create il primo (?) NFT del logo di backstage. Ho pagato 0.89 dollari per fare il mint e ho pagato 0.40 per poterlo vendere su Binance NFT market place.</p>\n<p>Fed</p>\n<p><br></p>','a66f1f57-4065-4f0c-8dd3-7d9b338b557a');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `migrations` */

/*Table structure for table `tickets` */

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `price` int(11) NOT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  `pay_order_id` varchar(255) NOT NULL,
  `buyerId` varchar(36) DEFAULT NULL,
  `tokenURL` varchar(255) DEFAULT NULL,
  `ipfsURL` varchar(255) DEFAULT NULL,
  `eventcardId` varchar(36) DEFAULT NULL,
  `is_minted` int(11) NOT NULL DEFAULT 0,
  `count` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_521ce4577abe60051c507647e02` (`eventcardId`),
  KEY `FK_301387c91e94798e757961aef71` (`buyerId`),
  CONSTRAINT `FK_301387c91e94798e757961aef71` FOREIGN KEY (`buyerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_521ce4577abe60051c507647e02` FOREIGN KEY (`eventcardId`) REFERENCES `event_cards` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `tickets` */

insert  into `tickets`(`id`,`deletedAt`,`createdAt`,`updatedAt`,`price`,`wallet_address`,`pay_order_id`,`buyerId`,`tokenURL`,`ipfsURL`,`eventcardId`,`is_minted`,`count`) values 
('02505fdd-eee9-4e2d-9738-5b5187874b76',NULL,'2022-05-21 03:05:59.378226','2022-05-21 03:05:59.378226',10,'daniel0001.testnet','Enwwch3TBdexXLps9FLd1A7vGP8xxgGiAqznwMCRSjBZ','e606cf44-b94b-4228-a06c-4b0050d1b80e',NULL,NULL,'ca649a78-1a75-4606-9227-2db3cd13c880',0,'2'),
('480eb9a7-62fc-4d8d-8a6b-cf956e014eb6',NULL,'2022-05-21 02:56:01.541133','2022-05-21 02:56:01.541133',10,'daniel0001.testnet','2GpyhYvgvAcVkgJhnLj5YV5N9yqg2MeU8ApkmGCVLQmU','e606cf44-b94b-4228-a06c-4b0050d1b80e',NULL,NULL,'ca649a78-1a75-4606-9227-2db3cd13c880',0,NULL),
('51fc91f6-6d73-46b1-aa83-0c791725824c',NULL,'2022-05-21 02:49:09.642603','2022-05-21 02:49:09.642603',10,'daniel0001.testnet','51n5GJgZ1etqt8aZC3ha4U6hwk7kjbum8ueMSc4Ta4qw','e606cf44-b94b-4228-a06c-4b0050d1b80e',NULL,NULL,'ca649a78-1a75-4606-9227-2db3cd13c880',0,NULL);

/*Table structure for table `user_avatars` */

DROP TABLE IF EXISTS `user_avatars`;

CREATE TABLE `user_avatars` (
  `id` varchar(36) NOT NULL,
  `src` varchar(255) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_avatars` */

insert  into `user_avatars`(`id`,`src`,`deletedAt`,`createdAt`,`updatedAt`) values 
('0','/img/avatars/avatar.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-24 08:36:04.725611'),
('1','/img/avatars/avatar2.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930'),
('2','/img/avatars/avatar3.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-24 08:36:10.906704'),
('4','/img/avatars/avatar4.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930'),
('5','/img/avatars/avatar5.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930'),
('6','/img/avatars/avatar6.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930'),
('7','/img/avatars/avatar7.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930'),
('8','/img/avatars/avatar8.jpg',NULL,'2022-05-18 11:43:06.499714','2022-05-18 11:43:06.718930');

/*Table structure for table `user_backgrounds` */

DROP TABLE IF EXISTS `user_backgrounds`;

CREATE TABLE `user_backgrounds` (
  `id` varchar(36) NOT NULL,
  `src` varchar(255) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_backgrounds` */

insert  into `user_backgrounds`(`id`,`src`,`deletedAt`,`createdAt`,`updatedAt`) values 
('1','/img/bg/bg-small.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:16:48.968145'),
('2','/img/bg/bg-small2.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:16:58.976180'),
('3','/img/bg/bg-small3.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:17:03.993922'),
('4','/img/bg/bg-small4.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:17:07.004593'),
('5','/img/bg/bg-small5.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:17:10.210852'),
('6','/img/bg/bg-small6.png',NULL,'2022-05-18 11:43:06.847930','2022-05-18 16:17:13.249011');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL DEFAULT 'NORMAL',
  `login_user` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email_verified` tinyint(4) DEFAULT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `followers` int(11) NOT NULL DEFAULT 0,
  `medium` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `background` varchar(255) DEFAULT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  `forgetpassword_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

/*Data for the table `users` */

insert  into `users`(`id`,`deletedAt`,`createdAt`,`updatedAt`,`name`,`email`,`user_type`,`login_user`,`password`,`phone`,`role`,`email_verified`,`verification_code`,`followers`,`medium`,`instagram`,`twitter`,`facebook`,`avatar`,`background`,`wallet_address`,`forgetpassword_code`) values 
('8adfbce7-d864-4f20-94f9-5bd9fd3163bc',NULL,'2022-05-25 10:22:51.541343','2022-05-25 10:22:51.541343','Sky God','skygod1994323@gmail.com','ADMIN',NULL,'$2b$10$esFHw6YoJnfHLfivRKQdGeUOrryK81pRxKkx1nr8buChkjbvUbtlW',NULL,NULL,1,'',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('8d2453cf-958d-47f1-94cc-e7b80b87ac91',NULL,'2022-05-25 10:52:32.602420','2022-05-25 10:52:32.602420','Test Super','testsuper@gmail.com','NORMAL',NULL,'$2b$10$ycQ.wodHixMfYCEtRGNB1uQGlEVP9fUAROmz1X4DrKyBV9aV6YalS',NULL,NULL,0,'wb5AxRvifusOm3vCvVVqaM6FdvoD86',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('8e910bb6-04e7-40ac-b061-a0dbdf02bb13',NULL,'2022-05-25 10:57:32.086818','2022-05-25 10:58:01.287701','abc','babypigdev1@gmail.com','SUPER',NULL,'$2b$10$QSnt7JtEXo/lVSGeFx6BNuwv5WyoM4U68Rjn9MSgFoc4o0IPMEJ9G',NULL,NULL,1,'IJ0HaWOMMu5NuGaZ6N1fX879EL2WFj',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('a2f7c270-ac36-475b-869d-abc703bb50ef',NULL,'2022-02-20 19:55:06.767941','2022-05-20 16:27:36.511785','test','test@gmail.com','NORMAL',NULL,'$2b$10$mrygFvrftekTWGHEmBs1dOP5uqnTi4tkzsemzuve3JozdFviH47S.',NULL,NULL,0,'tHgQT3kyrim9siQsaba5th0pFkWYhW',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg',NULL,NULL,NULL),
('a66f1f57-4065-4f0c-8dd3-7d9b338b557a',NULL,'2022-03-16 04:07:11.956513','2022-05-20 16:27:36.781549','name','email@gmail.com','ADMIN',NULL,'$2b$10$Ofri9Wjn.UjjciPFIryL/O0Q9P1YNlnOPI7R5CAkp6Mb6bLcDYEC2','123456',NULL,1,'OT64Uht3tWIneasO1J0U1zH78rB0B6',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg','assets/uploads/background/edKhzWMridfTEbTC.jpg',NULL,'aKnx5V3ahokcRNAPhnHaf3QqT7Zeay'),
('a82c9a77-c8f7-4f32-bb1f-81af33e29101',NULL,'2021-12-18 02:59:57.236052','2022-05-20 16:27:37.001988','Fed','fedman78@gmail.com','NORMAL',NULL,'$2b$10$xNAY73Vs.EvnOJtMn6ZZiuS4ZiNnQEZCp1YmRYJmnyI1tyWrwJRWm','00012457',NULL,1,'7f1CYfK0JHYdGY9iOUJoLOWhzPG5hZ',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg','assets/uploads/background/WkysTnZEpmiXHlNR.jpg',NULL,''),
('aa86f70f-d395-4d60-a1dd-80245e9e9c43',NULL,'2022-02-20 19:55:39.774468','2022-05-20 16:27:37.332829','test1','testproject01.hm@gmail.com','NORMAL',NULL,'$2b$10$Ydyzs.HijW/o7HfrnBGQL.RS2BLXVJZKTNjo4l2dpP8utLy93pFvq',NULL,NULL,1,'HYGU87jF2KkWWjrOOo2nZubX0ggpzl',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg',NULL,'0x049dec70191d38f20ebdc5959cb83f8f66117d25',NULL),
('c8e76ddd-783c-4354-80d7-a9641ffcc21f',NULL,'2021-12-20 06:26:05.945363','2022-05-20 16:27:37.663330','Fed','hisaco2014@ritumusic.com','NORMAL',NULL,'$2b$10$tZlOW9I9bRg5VxD2pYW4re5NhJlS3eKKTwIpOrKhqlAH8XWKFSIJm',NULL,NULL,1,'sCtxPHHsVCV6icsnP7tOgeNP1rZiXy',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg',NULL,NULL,NULL),
('e606cf44-b94b-4228-a06c-4b0050d1b80e',NULL,'2022-05-13 17:48:00.511102','2022-05-20 16:27:38.599236','Baby Pig','babypigdev@gmail.com','ADMIN',NULL,'$2b$10$0f2CwtB6zWQ0ssiC6A1ZI.aTQMh6JafhRcpRyycxvyaY/OPrwVTiq','',NULL,1,'tc735NxtzzPsVqfTXAdXJoanxb148G',0,'34','https://234','324','','/img/avatars/avatar.jpg','/img/bg/bg-small3.png','123',NULL),
('f8453fd5-0ff1-4b37-ba56-4a73eb677a79',NULL,'2022-05-25 10:57:02.079130','2022-05-25 10:57:02.079130','Test Super','testsuper1@gmail.com','NORMAL',NULL,'$2b$10$bqVEcG48QiBlteWnztF1geTQ36Jj0HcLAhFn/Ll6Xxib/s62GVpV6',NULL,NULL,0,'N3mSm9hr1IVhQ3nnIjekmqJvrMVsOn',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('fc14f8c8-32cf-4847-b757-2c749895ff2f',NULL,'2022-01-31 20:51:26.565779','2022-05-20 16:27:41.739173','Alik','kssalexander323@gmail.com','NORMAL',NULL,'$2b$10$HlEUn3TnlSDCfJ/fpMg53.tLuigXq8uc19Um4CwuRdAoA3bmSgiH6',NULL,NULL,1,'',0,NULL,NULL,NULL,NULL,'/img/avatars/avatar.jpg',NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
