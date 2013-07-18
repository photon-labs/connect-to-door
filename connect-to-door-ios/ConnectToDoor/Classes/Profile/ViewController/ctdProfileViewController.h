//
//  ctdProfileViewController.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <FacebookSDK/FacebookSDK.h>
#import <QuartzCore/QuartzCore.h>
#import "ctdProfileService.h"
#import "ctdBaseViewController.h"

@interface ctdProfileViewController : ctdBaseViewController <FBUserSettingsDelegate, ProfileServiceDelegate>

@property (strong, nonatomic) IBOutlet FBProfilePictureView *userProfileImage;
@property (strong, nonatomic) IBOutlet UILabel *userNameLabel;
@property (strong, nonatomic) IBOutlet UILabel *facebookIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeNameLabel;
@property (strong, nonatomic) IBOutlet UILabel *genderLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeEmailPhotonLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeStartWorkLabel;
@property (strong, nonatomic) IBOutlet UILabel *signatureLabel;
@property (strong, nonatomic) IBOutlet UILabel *statusLabel;
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

- (IBAction)backToWelcomePage:(id)sender;

@end
