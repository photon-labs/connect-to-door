//
//  ctdProfileViewController.h
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/11/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FacebookSDK/FacebookSDK.h>
#import <QuartzCore/QuartzCore.h>
#import "ctdProfileService.h"
#import "ctdBaseViewController.h"

@interface ctdProfileViewController : ctdBaseViewController <ProfileServiceDelegate>{
    ctdProfileService *profileService;
}

@property (strong, nonatomic) IBOutlet FBProfilePictureView *userProfileImage;
@property (strong, nonatomic) IBOutlet UILabel *userNameLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeEmailPhotonLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeStartWorkLabel;
@property (strong, nonatomic) IBOutlet UILabel *authorityLabel;
@property (strong, nonatomic) IBOutlet UILabel *projectIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *marriedLabel;
@property (strong, nonatomic) IBOutlet UILabel *condolencesLabel;
@property (strong, nonatomic) IBOutlet UILabel *maternityLabel;
@property (strong, nonatomic) IBOutlet UILabel *cOffLabel;
@property (strong, nonatomic) IBOutlet UILabel *annualLabel;
@property (strong, nonatomic) IBOutlet UILabel *onsiteLabel;
@property (strong, nonatomic) IBOutlet UILabel *paternityLabel;
@property (strong, nonatomic) IBOutlet UILabel *sickLabel;
@property (nonatomic, strong) IBOutlet UIButton *attendanceButton;
@property (nonatomic, strong) IBOutlet UIButton *voucherButton;

- (IBAction)backToWelcomePage:(id)sender;
- (IBAction)didClickVoucher:(id)sender;
@end
