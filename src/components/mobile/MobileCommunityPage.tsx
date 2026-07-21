import React from 'react';
import {
  Users, MessageSquare, Info, Shield, Radio, Search, Image as ImageIcon,
  MapPin, Plus, Heart, ChevronDown, ChevronUp, Check, AlertTriangle,
  CheckCircle, ArrowUpRight, HelpCircle, Phone, Globe, Trash2, Calendar,
  Compass, X, Droplet, ShieldCheck, ChevronLeft, Activity, ShieldAlert, HeartHandshake
} from 'lucide-react';

interface MobileCommunityPageProps {
  isDarkMode: boolean;
  glassCardClass: string;
  textPrimary: string;
  textSecondary: string;
  t: any;
  selectedCommunityId: number | null;
  setSelectedCommunityId: (id: number | null) => void;
  selectedDetailTab: 'about' | 'feed' | 'directory' | 'resources' | 'mutualaid';
  setSelectedDetailTab: (tab: 'about' | 'feed' | 'directory' | 'resources' | 'mutualaid') => void;
  myCommunitiesSubTab: 'communities' | 'feed';
  setMyCommunitiesSubTab: (tab: 'communities' | 'feed') => void;
  newPostText: string;
  setNewPostText: (val: string) => void;
  newPostImage: string | null;
  setNewPostImage: (val: string | null) => void;
  handleCommunityImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  composerCommunityId: string;
  setComposerCommunityId: (id: string) => void;
  handlePostCommunity: (communityId?: number) => void;
  handleToggleUpvote: (postId: string) => void;
  handleDeletePost: (postId: string) => void;
  communityDetailsAccordionOpen: boolean;
  setCommunityDetailsAccordionOpen: (open: boolean) => void;
  handleCommunityCheckin: (status: 'safe' | 'evac' | 'sos', communityId: number) => void;
  mutualAidLedger: any[];
  setMutualAidLedger: React.Dispatch<React.SetStateAction<any[]>>;
  newAidType: 'request' | 'offer';
  setNewAidType: (type: 'request' | 'offer') => void;
  newAidItem: string;
  setNewAidItem: (val: string) => void;
  newAidLoc: string;
  setNewAidLoc: (val: string) => void;
  newAidDesc: string;
  setNewAidDesc: (val: string) => void;
  handleAddAidLedgerItem: (communityId: number) => void;
  communityPosts: any[];
  showToast: (msg: string, type: 'success' | 'amber' | 'info' | 'error') => void;
  profileName: string;
  fetchLiveLocation: () => void;
  currentLocation: string;
  ALL_COMMUNITIES: any[];
  SEED_POSTS: any[];
  deletedPostIds: string[];
  upvotedPostIds: string[];
  user: any;
  isAdmin: boolean;
  communityCheckinStats: any;
  userCheckinStates: any;
}

export const MobileCommunityPage: React.FC<MobileCommunityPageProps> = ({
  isDarkMode,
  glassCardClass,
  textPrimary,
  textSecondary,
  t,
  selectedCommunityId,
  setSelectedCommunityId,
  selectedDetailTab,
  setSelectedDetailTab,
  myCommunitiesSubTab,
  setMyCommunitiesSubTab,
  newPostText,
  setNewPostText,
  newPostImage,
  setNewPostImage,
  handleCommunityImage,
  composerCommunityId,
  setComposerCommunityId,
  handlePostCommunity,
  handleToggleUpvote,
  handleDeletePost,
  communityDetailsAccordionOpen,
  setCommunityDetailsAccordionOpen,
  handleCommunityCheckin,
  mutualAidLedger,
  setMutualAidLedger,
  newAidType,
  setNewAidType,
  newAidItem,
  setNewAidItem,
  newAidLoc,
  setNewAidLoc,
  newAidDesc,
  setNewAidDesc,
  handleAddAidLedgerItem,
  communityPosts,
  showToast,
  profileName,
  fetchLiveLocation,
  currentLocation,
  ALL_COMMUNITIES,
  SEED_POSTS,
  deletedPostIds,
  upvotedPostIds,
  user,
  isAdmin,
  communityCheckinStats,
  userCheckinStates
}) => {
  const communityImageRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col animate-[fadeIn_0.4s_ease-out] z-10">
      {selectedCommunityId === null ? (
        /* =========================================================================
           COMMUNITIES DASHBOARD VIEW (First & Second screens in reference)
           ========================================================================= */
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Header bar */}
          <div className="pt-24 px-6 pb-2 shrink-0 font-sans">
            <div className="flex justify-between items-end mb-1.5 flex-wrap gap-2">
              <h2 className={`text-3xl font-extrabold font-display tracking-tighter ${textPrimary} drop-shadow-md`}>
                Community
              </h2>
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full mb-1">
                4 Active Channels
              </span>
            </div>
            <p className={`text-xs font-medium ${textSecondary}`}>
              Connect with swift water rescuers, hydrologists, and weather spotters near you.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-32 space-y-5 no-scrollbar">
            {/* Top horizontal scrolled channels list */}
            <div className="pt-1">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs font-black uppercase tracking-widest ${textPrimary} opacity-90`}>
                  All community
                </span>
                <button
                  onClick={() => setMyCommunitiesSubTab('communities')}
                  className="text-[11px] font-black uppercase tracking-wider text-[#0A84FF]"
                >
                  View all
                </button>
              </div>

              {/* Scrolling Circles List */}
              <div className="flex space-x-4 overflow-x-auto pb-2 pt-1 no-scrollbar select-none">
                {ALL_COMMUNITIES.map((community) => (
                  <button
                    key={community.id}
                    onClick={() => {
                      setSelectedCommunityId(community.id);
                      setSelectedDetailTab('about');
                    }}
                    className="flex flex-col items-center flex-shrink-0 group focus:outline-none"
                  >
                    <div className="relative">
                      {/* Rounded avatar frame */}
                      <div className="w-[58px] h-[58px] rounded-full p-[2px] bg-gradient-to-tr from-[#0A84FF] via-purple-500 to-[#FF9F0A] shadow-md transition-transform active:scale-95 duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#121214] relative bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center">
                          {/* Fallback initials display */}
                          <span className="absolute text-[10px] font-black text-white tracking-widest select-none">
                            {community.shortName.substring(0, 3).toUpperCase()}
                          </span>
                          <img
                            src={community.bgImage}
                            alt={community.name}
                            className="w-full h-full object-cover transition-all relative z-10"
                            referrerPolicy="no-referrer"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                          <div className="absolute inset-0 bg-black/25 z-20"></div>
                        </div>
                      </div>
                      {/* Hot fire/star orange badge overlay */}
                      <span className="absolute -top-1 -right-1 bg-[#FF9F0A] text-white text-[8px] px-1 py-0.5 rounded-full font-black scale-90 border border-[#121214]">
                        {community.id === 'river-rescue' ? 'HOT' : community.id === 'hydrology' ? 'ACT' : 'LIVE'}
                      </span>
                    </div>
                    <span className={`text-[10px] mt-1.5 font-bold tracking-tight text-center truncate w-[68px] ${textPrimary}`}>
                      {community.shortName}
                    </span>
                  </button>
                ))}

                {/* Coming soon placeholder */}
                <div className="flex flex-col items-center flex-shrink-0 opacity-50">
                  <div className="w-[58px] h-[58px] rounded-full border-2 border-dashed border-zinc-500 flex items-center justify-center bg-black/5 dark:bg-white/5">
                    <Compass size={18} className={textSecondary} />
                  </div>
                  <span className={`text-[10px] mt-1.5 font-bold tracking-tight text-center w-[68px] ${textSecondary}`}>
                    Coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Main Dual Tab Switcher: My feed / My communities */}
            <div className="relative">
              <div className="flex border-b border-zinc-200 dark:border-white/10">
                <button
                  onClick={() => setMyCommunitiesSubTab('feed')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs uppercase tracking-widest relative transition-all ${myCommunitiesSubTab === 'feed'
                      ? (isDarkMode ? 'text-white' : 'text-black')
                      : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                >
                  My feed
                  {myCommunitiesSubTab === 'feed' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0A84FF] rounded-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setMyCommunitiesSubTab('communities')}
                  className={`flex-1 py-2.5 text-center font-bold text-xs uppercase tracking-widest relative transition-all ${myCommunitiesSubTab === 'communities'
                      ? (isDarkMode ? 'text-white' : 'text-black')
                      : 'text-zinc-400 dark:text-zinc-500'
                    }`}
                >
                  My community
                  {myCommunitiesSubTab === 'communities' && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0A84FF] rounded-full"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Content Frame based on the Active Sub-tab */}
            {myCommunitiesSubTab === 'feed' ? (
              /* COMMUNITY FEED PANEL */
              <div className="space-y-4">
                {/* Write Post Box card */}
                <div className={`p-4 rounded-[28px] shadow-sm flex flex-col border ${glassCardClass}`}>
                  <div className="flex space-x-3 items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-[11px] ring-2 ring-[#0A84FF]/20 flex-shrink-0">
                      {profileName ? profileName.slice(0, 2).toUpperCase() : 'RE'}
                    </div>
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Report a river obstacle, downpour stream, or seek relief..."
                      className={`flex-1 bg-transparent resize-none outline-none font-medium text-sm pt-1.5 ${textPrimary} placeholder:text-zinc-500`}
                      rows={2}
                    />
                  </div>

                  {newPostImage && (
                    <div className="relative mt-2 ml-12 inline-block w-fit">
                      <img
                        src={newPostImage}
                        alt="Attachment"
                        className="h-20 w-auto rounded-xl object-cover border border-gray-500/20"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => setNewPostImage(null)}
                        className="absolute -top-2 -right-2 bg-[#FF453A] text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </div>
                  )}

                  {/* Options Selector and Publish row */}
                  <div className="flex justify-between items-center border-t border-gray-500/10 pt-3 mt-3">
                    {/* Left attachments and Tag Channel Dropdown */}
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={communityImageRef}
                        onChange={handleCommunityImage}
                      />
                      <button
                        onClick={() => communityImageRef.current?.click()}
                        className="text-zinc-500 p-1"
                        title="Attach image"
                      >
                        <ImageIcon size={18} />
                      </button>
                      <button
                        onClick={() => {
                          fetchLiveLocation();
                          showToast(`Location tagged: ${currentLocation}`, 'info');
                        }}
                        className="text-zinc-500 p-1"
                        title="Tag location"
                      >
                        <MapPin size={18} />
                      </button>

                      {/* Tag drop selector */}
                      <div className="border-l border-gray-500/15 pl-3 flex items-center relative">
                        <select
                          id="composer-community-id-select"
                          value={composerCommunityId}
                          onChange={(e) => setComposerCommunityId(e.target.value)}
                          className="bg-transparent text-[11px] font-black uppercase tracking-wider outline-none cursor-pointer text-[#0A84FF] pl-0 pr-3 appearance-none select-none focus:ring-0"
                          style={{
                            width:
                              composerCommunityId === 'river-rescue' ? '110px' :
                                composerCommunityId === 'hydrology' ? '128px' :
                                  composerCommunityId === 'storm-spotters' ? '110px' :
                                    composerCommunityId === 'care-sandbags' ? '138px' : '110px'
                          }}
                        >
                          {ALL_COMMUNITIES.map(c => (
                            <option key={c.id} value={c.id} className="dark:bg-[#121214] font-sans text-black dark:text-white">
                              Post in: {c.shortName}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={11} className="text-[#0A84FF] pointer-events-none absolute right-0.5 top-1/2 -translate-y-1/2 opacity-85" strokeWidth={3} />
                      </div>
                    </div>

                    <button
                      onClick={() => handlePostCommunity()}
                      disabled={!newPostText.trim() && !newPostImage}
                      className={`px-5 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider shadow-sm transition-transform active:scale-95 disabled:opacity-40 bg-[#0A84FF] text-white`}
                    >
                      Publish Post
                    </button>
                  </div>
                </div>

                {/* Dynamic Feed Post Cards */}
                {[...communityPosts, ...SEED_POSTS]
                  .filter((post: any) => !deletedPostIds.includes(post.id))
                  .map((post: any) => {
                    const relatedChan = ALL_COMMUNITIES.find(c => c.id === post.communityId) || ALL_COMMUNITIES[0];
                    return (
                      <div
                        key={post.id}
                        className={`p-4 rounded-[28px] shadow-sm border ${glassCardClass} flex flex-col space-y-3 transition-transform`}
                      >
                        {/* Community backlink indicator */}
                        <div className="flex justify-between items-center border-b border-gray-500/5 pb-2">
                          <button
                            onClick={() => {
                              setSelectedCommunityId(relatedChan.id);
                              setSelectedDetailTab('feed');
                            }}
                            className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-wider text-[#FF9F0A] hover:underline"
                          >
                            <Droplet size={10} fill="currentColor" />
                            <span>Posted in: {relatedChan.name}</span>
                          </button>
                          {post.isVerified && (
                            <div className="flex items-center space-x-1 py-0.5 px-1.5 rounded bg-[#32D74B]/10 text-[#32D74B] text-[8px] font-black uppercase">
                              <ShieldCheck size={10} />
                              <span>Verified Spotter</span>
                            </div>
                          )}
                        </div>

                        {/* Author Information row */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-600 to-zinc-400 flex items-center justify-center font-bold text-white text-xs select-none">
                              {post.authorName.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <span className={`block font-bold text-xs ${textPrimary}`}>
                                {post.authorName}
                              </span>
                              <div className={`flex items-center space-x-1.5 text-[10px] font-medium ${textSecondary}`}>
                                <MapPin size={9} />
                                <span>{post.zone || 'Flood Delta'}</span>
                                <span>·</span>
                                <span>
                                  {(() => {
                                    const m = post.timestamp?.toMillis ? post.timestamp.toMillis() : post.timestamp?.seconds ? post.timestamp.seconds * 1000 : Date.now();
                                    return new Date(m).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Text & Image */}
                        {post.text && (
                          <p className={`text-xs leading-relaxed font-medium ${textPrimary} opacity-90`}>
                            {post.text}
                          </p>
                        )}
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Community dispatch update"
                            className="w-full h-auto max-h-48 object-cover rounded-2xl mt-1 border border-gray-500/10"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        {/* Actions Footer row */}
                        <div className="flex items-center space-x-6 pt-2 border-t border-gray-500/5 text-gray-400 font-mono select-none">
                          <button
                            onClick={() => handleToggleUpvote(post.id)}
                            className={`flex items-center space-x-1.5 text-[9px] font-black uppercase transition-all duration-300 ${upvotedPostIds.includes(post.id) ? 'text-[#FF453A]' : ''
                              }`}
                          >
                            <Heart
                              size={13}
                              fill={upvotedPostIds.includes(post.id) ? 'currentColor' : 'none'}
                              className={upvotedPostIds.includes(post.id) ? 'animate-bounce' : ''}
                              style={{ strokeColor: 'currentColor' }}
                            />
                            <span>{(post.upvotes || 0) + (upvotedPostIds.includes(post.id) ? 1 : 0)} UPVOTES</span>
                          </button>

                          <button
                            onClick={() => {
                              showToast('Telemetry shared to localized crisis control.', 'info');
                            }}
                            className="flex items-center space-x-1.5 text-[9px] font-black uppercase hover:text-[#0A84FF] transition-colors"
                          >
                            <Compass size={13} />
                            <span>Share Radar</span>
                          </button>

                          {(post.authorId === (user ? user.uid : 'guest_resident') || isAdmin) && (
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="flex items-center space-x-1.5 text-[9px] font-black uppercase text-[#FF453A] hover:text-[#FF3B30] transition-colors ml-auto"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              /* COMMUNITIES LIST PANEL (Reiki, Crystal cards style in reference) */
              <div className="space-y-4">
                {ALL_COMMUNITIES.map((community) => (
                  <div
                    key={community.id}
                    onClick={() => {
                      setSelectedCommunityId(community.id);
                      setSelectedDetailTab('about');
                    }}
                    className={`rounded-[28px] overflow-hidden relative shadow-md h-[155px] cursor-pointer group transition-all duration-300 border border-black/5 bg-gradient-to-br from-zinc-800 to-zinc-950`}
                  >
                    {/* Background Picture with linear overlay */}
                    <img
                      src={community.bgImage}
                      alt={community.name}
                      className="w-full h-full object-cover absolute inset-0 filter brightness-[85%] transition-transform duration-500 z-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25 z-10"></div>

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 p-5 flex flex-col justify-between text-white font-sans z-20">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="bg-[#0A84FF]/25 border border-white/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-[#0A84FF]">
                            {community.shortName}
                          </div>
                          <div className="flex items-center space-x-1 text-xs">
                            <span className="text-[#FF9F0A]">★</span>
                            <span className="font-bold text-[11px]">{community.rating} ({community.members})</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-extrabold tracking-tight mt-2 text-white">
                          {community.name}
                        </h3>
                        <p className="text-[10px] text-zinc-300 font-medium line-clamp-2 mt-1 leading-normal">
                          {community.desc}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <span className="bg-white/10 border border-white/10 active:scale-95 transition-all text-white font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-full flex items-center shadow-lg">
                          View Community →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* =========================================================================
           COMMUNITY DETAILS SCREEN (Third, Fourth & Fifth screens in references)
           ========================================================================= */
        (() => {
          const activeCommunity = ALL_COMMUNITIES.find(c => c.id === selectedCommunityId) || ALL_COMMUNITIES[0];
          const activeTabPosts = [...communityPosts, ...SEED_POSTS].filter((post: any) => !deletedPostIds.includes(post.id) && post.communityId === activeCommunity.id);

          return (
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Upper Back header */}
              <div className="pt-24 px-5 pb-2 shrink-0 flex items-center space-x-2 border-b border-gray-500/5 select-none">
                <button
                  onClick={() => setSelectedCommunityId(null)}
                  className="p-1 px-1.5 rounded-full bg-zinc-500/10 text-[#0A84FF] transition-all flex items-center"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <span className={`text-[11px] font-black uppercase tracking-widest ${textSecondary}`}>
                  Back to Community
                </span>
              </div>

              <div className="flex-1 overflow-y-auto px-5 pb-32 pt-2 space-y-4 no-scrollbar">
                {/* Banner Promotion Card with backdrop */}
                <div className="rounded-[28px] overflow-hidden relative shadow-md h-[180px] border border-black/5 flex-shrink-0 bg-gradient-to-br from-zinc-800 to-zinc-950">
                  <img
                    src={activeCommunity.bgImage}
                    alt={activeCommunity.name}
                    className="w-full h-full object-cover absolute inset-0 filter brightness-[85%] z-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 z-10"></div>

                  {/* Banner details */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white font-sans z-20">
                    <div>
                      <div className="flex items-center space-x-1 text-[11px] font-black text-[#FF9F0A]">
                        <span>★</span>
                        <span>{activeCommunity.rating} ({activeCommunity.members} members)</span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight text-white mt-1">
                        {activeCommunity.name}
                      </h3>
                      <p className="text-[10px] text-zinc-300 font-medium leading-normal mt-1.5 opacity-90 line-clamp-2">
                        "{activeCommunity.tagline}"
                      </p>
                    </div>

                    <div className="flex justify-start">
                      <button
                        onClick={() => {
                          showToast('Successfully Joined Channel', 'success');
                        }}
                        className="bg-white/95 text-black border-2 border-white/10 active:scale-95 transition-all font-black text-[10px] uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center shadow-lg"
                      >
                        Join Community →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detail Horizontal Tabs Swapper */}
                <div className="border-b border-zinc-200 dark:border-white/10 flex space-x-2 overflow-x-auto no-scrollbar select-none py-1">
                  {['about', 'feed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedDetailTab(tab as any)}
                      className={`py-1.5 px-3.5 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all whitespace-nowrap ${selectedDetailTab === tab
                          ? 'bg-[#0A84FF] text-white'
                          : 'bg-[#0A84FF]/5 dark:bg-white/5 text-zinc-400'
                        }`}
                    >
                      {tab === 'about' ? 'About Community' : 'Feed'}
                    </button>
                  ))}
                </div>

                {/* Dynamic detail subpanels */}
                {selectedDetailTab === 'about' && (
                  /* ABOUT COMMUNITY SUBPANEL (Image 3 in screenshots) */
                  <div className="space-y-4 animate-[fadeIn_0.35s_ease-out]">
                    <div className={`p-5 rounded-[28px] border ${glassCardClass} space-y-3`}>
                      <h4 className={`text-sm font-black tracking-tight ${textPrimary}`}>
                        {activeCommunity.welcome}
                      </h4>
                      <p className={`text-xs ${textSecondary} leading-loose font-medium opacity-90`}>
                        {activeCommunity.about}
                      </p>

                      {/* Gorgeous 4-Image Grid rounded-2xl */}
                      <div className="grid grid-cols-2 gap-2 pb-2">
                        {activeCommunity.gridImages.map((imgUrl, i) => (
                          <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-500/5 shadow-sm bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative text-zinc-500 text-[10px] font-black uppercase tracking-wider select-none">
                            <span className="absolute">Active</span>
                            <img
                              src={imgUrl}
                              alt="Activity grid"
                              className="w-full h-full object-cover grayscale-[10%] transition-all duration-300 relative z-10"
                              referrerPolicy="no-referrer"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accordion list: What is this community for? */}
                    <div className={`rounded-[24px] border ${glassCardClass} overflow-hidden`}>
                      <button
                        onClick={() => setCommunityDetailsAccordionOpen(!communityDetailsAccordionOpen)}
                        className="w-full p-4 flex justify-between items-center bg-black/5 dark:bg-white/5"
                      >
                        <span className={`text-xs font-black uppercase tracking-wider ${textPrimary}`}>
                          What is this community for?
                        </span>
                        <span className={`text-xs transition-transform duration-300 ${communityDetailsAccordionOpen ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                      </button>

                      {communityDetailsAccordionOpen && (
                        <div className="p-4 border-t border-gray-500/10 text-xs text-zinc-500 dark:text-zinc-400 font-medium space-y-2 leading-relaxed">
                          <p>
                            This channel forms a localized grid layer for our river monitoring application. We synchronize physical telemetry observations with virtual community checklists to:
                          </p>
                          <ul className="list-disc pl-4 space-y-1.5">
                            <li>Validate automated hydrological warnings.</li>
                            <li>Coordinate swift boat operations and storm logistics.</li>
                            <li>Perform gamified safety drills (throw bags & barometric levels).</li>
                            <li>Instruct first responders using modern standards.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedDetailTab === 'feed' && (
                  /* FILTERED FEED FOR COMPONENT (In-channel feed) */
                  <div className="space-y-4 animate-[fadeIn_0.35s_ease-out]">
                    {/* Small inline post composer */}
                    <div className={`p-4 rounded-[28px] border ${glassCardClass} flex flex-col`}>
                      <div className="flex space-x-3 items-start">
                        <div className="w-8 h-8 rounded-full bg-[#FF9F0A]/20 flex items-center justify-center font-bold text-[#FF9F0A] text-[10px] flex-shrink-0">
                          {profileName ? profileName.slice(0, 2).toUpperCase() : 'RE'}
                        </div>
                        <textarea
                          value={newPostText}
                          onChange={(e) => setNewPostText(e.target.value)}
                          placeholder={`Post update directly in ${activeCommunity.shortName}...`}
                          className={`flex-1 bg-transparent resize-none outline-none font-medium text-xs pt-1.5 ${textPrimary} placeholder:text-zinc-500`}
                          rows={2}
                        />
                      </div>
                      <div className="flex justify-end pt-3 mt-2 border-t border-gray-500/5">
                        <button
                          onClick={() => handlePostCommunity(activeCommunity.id)}
                          disabled={!newPostText.trim() && !newPostImage}
                          className={`px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#0A84FF] text-white shadow-sm disabled:opacity-40 transition-all`}
                        >
                          Publish in channel
                        </button>
                      </div>
                    </div>

                    {activeTabPosts.length === 0 ? (
                      <div className="text-center py-8 opacity-40">
                        <MessageSquare size={32} className="mx-auto mb-2 text-zinc-500" />
                        <p className="text-xs font-bold">No community posts in this channel yet.</p>
                      </div>
                    ) : (
                      activeTabPosts.map((post: any) => (
                        <div
                          key={post.id}
                          className={`p-4 rounded-[24px] border ${glassCardClass} flex flex-col space-y-3 shadow-sm`}
                        >
                          <div className="flex justify-between items-center pt-0.5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center font-bold text-white text-xs">
                                {post.authorName.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <span className={`block font-bold text-xs ${textPrimary}`}>
                                  {post.authorName}
                                </span>
                                <span className={`block text-[9px] ${textSecondary}`}>
                                  {(() => {
                                    const m = post.timestamp?.toMillis ? post.timestamp.toMillis() : post.timestamp?.seconds ? post.timestamp.seconds * 1000 : Date.now();
                                    return new Date(m).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                  })()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className={`text-xs leading-relaxed font-medium ${textPrimary} opacity-90`}>
                            {post.text}
                          </p>
                          {post.image && (
                            <div className="w-full h-28 rounded-xl overflow-hidden mt-1 bg-zinc-800 flex items-center justify-center border border-gray-500/5 text-zinc-500 text-[10px] font-black uppercase tracking-wider relative select-none">
                              <span className="absolute">Attachment</span>
                              <img
                                src={post.image}
                                alt="Update visual"
                                className="w-full h-full object-cover relative z-10"
                                referrerPolicy="no-referrer"
                                onError={(e) => { e.currentTarget.parentNode?.remove(); }}
                              />
                            </div>
                          )}

                          {/* Action row with hearts */}
                          <div className="flex items-center space-x-6 pt-2 border-t border-gray-500/5 text-gray-400 font-mono select-none">
                            <button
                              onClick={() => handleToggleUpvote(post.id)}
                              className={`flex items-center space-x-1.5 text-[9px] font-black uppercase transition-colors ${upvotedPostIds.includes(post.id) ? 'text-[#FF453A]' : ''
                                }`}
                            >
                              <Heart
                                size={12}
                                fill={upvotedPostIds.includes(post.id) ? 'currentColor' : 'none'}
                                className={upvotedPostIds.includes(post.id) ? 'animate-bounce' : ''}
                              />
                              <span>{(post.upvotes || 0) + (upvotedPostIds.includes(post.id) ? 1 : 0)} Upvotes</span>
                            </button>

                            {(post.authorId === (user ? user.uid : 'guest_resident') || isAdmin) && (
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="flex items-center space-x-1.5 text-[9px] font-black uppercase text-[#FF453A] transition-colors ml-auto"
                              >
                                <Trash2 size={12} />
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}



              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};
